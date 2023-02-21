import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer, ViteDevServer } from 'vite';
import express from 'express';
import bodyParser from 'body-parser';
import { queryParser } from 'express-query-parser';
import serialize from 'serialize-javascript';
import { expressCspHeader } from 'express-csp-header';
import { createProxyMiddleware } from 'http-proxy-middleware';
import type { IStateSchema } from 'client/src/typings/IStateSchema';
import { isDev } from './utils/constants';
import { themeRouter } from './routes/themeRoutes';
import { forumRouter } from './routes/forumRoutes';
import { feedbackRouter } from './routes/feedbackRoutes';
import { postgresConnect, mongoConnect } from './db';
import { getCspDirectives } from './utils/CspDirectives';
import { WebhookController } from './controllers/webhookController';
import { getUser } from './utils/getUser/getUser';

dotenv.config({ path: path.join(__dirname, '..', '..', '.env') });

async function startServer() {
  const app = express();

  app.use(
    '/api/v2',
    createProxyMiddleware({
      changeOrigin: true,
      cookieDomainRewrite: { '*': '' },
      target: 'https://ya-praktikum.tech',
    })
  );

  app
    .disable('x-powered-by')
    .use(cors())
    .use(bodyParser.json())
    .use(
      queryParser({
        parseNull: true,
        parseUndefined: true,
        parseBoolean: true,
        parseNumber: true,
      })
    );

  app.use(
    expressCspHeader({
      directives: getCspDirectives(),
    })
  );

  const port = Number(process.env.SERVER_PORT) || 5000;

  postgresConnect();
  mongoConnect();

  app.get('/api', (_, res) => {
    res.json('👋 Howdy from the server :)');
  });

  app.post('/webhook/github/pullrequest', WebhookController.handlePullRequest);

  app.use('/api/theme', themeRouter);
  app.use('/api/forum', forumRouter);
  app.use('/api', feedbackRouter);

  const distPath = path.dirname(require.resolve('client/dist/index.html'));
  const srcPath = path.dirname(require.resolve('client'));

  const ssrClientPath = require.resolve('client/ssr-dist/SsrRender.cjs');
  let vite: ViteDevServer;

  if (isDev()) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      root: srcPath,
      appType: 'custom',
    });
    app.use(vite.middlewares);
  }

  app.use('*', async (req, res, next) => {
    const url = req.originalUrl;
    const cookies = req.headers.cookie;

    try {
      let template: string;
      let render: (url: string, store: IStateSchema) => Promise<string>;

      if (!isDev()) {
        template = fs.readFileSync(path.resolve(distPath, 'index.html'), 'utf-8');
        render = (await import(ssrClientPath)).render;
      } else {
        template = fs.readFileSync(path.resolve(srcPath, 'index.html'), 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        render = (await vite.ssrLoadModule(path.resolve(srcPath, 'SsrRender.tsx'))).render;
      }

      const userInfo = await getUser(cookies);
      const initialState: IStateSchema = {
        user: { userInfo },
        appStatus: { isSoundOn: true },
      };

      // @ts-expect-error Property 'nonce' does not exist on type 'Request'
      const stateMarkup = `<script nonce='${req.nonce}'>window.__PRELOADED_STATE__=${serialize(initialState)}</script>`;
      const appHtml = await render(url, initialState);

      const html = template.replace(`<!--ssr-outlet-->`, appHtml).replace(`<!--store-outlet-->`, stateMarkup);

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (e) {
      if (isDev()) {
        vite.ssrFixStacktrace(e as Error);
      }
      next(e);
    }
  });

  app.listen(port, () => {
    console.log('\x1b[32m', `  ➜ 🎸 Server is listening on port: ${port}`, '\x1b[0m');
  });
}

startServer();
