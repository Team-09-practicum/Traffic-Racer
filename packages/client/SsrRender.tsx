import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { StoreProvider } from './src/utils/store/StoreProvider';
import App from './src/App';
import { IStateSchema } from '@/typings/IStateSchema';

export function render(url: string, store: IStateSchema) {
  return ReactDOMServer.renderToString(
    <StoreProvider initialState={store}>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StoreProvider>
  );
}
