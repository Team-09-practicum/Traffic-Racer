import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { StoreProvider } from './src/utils/store/StoreProvider';
import App from './src/App';

export function render(url: string) {
  return ReactDOMServer.renderToString(
    <StoreProvider>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StoreProvider>
  );
}
