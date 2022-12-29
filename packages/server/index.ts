import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer, ViteDevServer } from 'vite';

import express from 'express';
import { createClientAndConnect } from './db';

dotenv.config({ path: path.join(__dirname, '..', '..', '.env') });

const isDev = () => process.env.NODE_ENV === 'development';

async function startServer() {
  const app = express();
  app.use(cors());
  const port = Number(process.env.SERVER_PORT) || 3001;

  createClientAndConnect();

  app.get('/api', (_, res) => {
    res.json('👋 Howdy from the server :)');
  });
  const distPath = path.dirname(require.resolve('client/dist/index.html'));
  const srcPath = path.dirname(require.resolve('client'));

  const ssrClientPath = require.resolve('client/ssr-dist/client.cjs');
  let vite: ViteDevServer;

  if (isDev()) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      root: srcPath,
      appType: 'custom',
    });
    app.use(vite.middlewares);
  } else {
    app.use('/assets', express.static(path.resolve(distPath, 'assets')));
  }

  app.use('*', async (req, res, next) => {
    const url = req.originalUrl;

    try {
      let template: string;
      let render: () => Promise<string>;

      if (!isDev()) {
        template = fs.readFileSync(path.resolve(distPath, 'index.html'), 'utf-8');
        render = (await import(ssrClientPath)).render;
      } else {
        template = fs.readFileSync(path.resolve(srcPath, 'index.html'), 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        render = (await vite.ssrLoadModule(path.resolve(srcPath, 'SsrRender.tsx'))).render;
      }

      const appHtml = await render();
      const html = template.replace(`<!--ssr-outlet-->`, appHtml);

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (e) {
      if (isDev()) {
        vite.ssrFixStacktrace(e as Error);
      }
      next(e);
    }
  });

  app.listen(port, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${port}`);
  });
}

startServer();
