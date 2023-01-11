import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { registerSW } from '@/utils/serviceWorker/serviceWorkerRegistration';
import { StoreProvider } from '@/utils/store/StoreProvider';
import App from './App';
import './styles/index.scss';

const state = window.__PRELOADED_STATE__;
delete window.__PRELOADED_STATE__;

const appComponents = (): React.ReactNode => (
  <React.StrictMode>
    <StoreProvider initialState={state}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StoreProvider>
  </React.StrictMode>
);

ReactDOM.hydrateRoot(document.getElementById('root') as HTMLElement, appComponents());

registerSW();
