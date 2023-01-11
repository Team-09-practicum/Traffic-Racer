import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { registerSW } from '@/utils/serviceWorker/serviceWorkerRegistration';
import { StoreProvider } from '@/utils/store/StoreProvider';
import App from './App';
import './styles/index.scss';

const appComponents = (): React.ReactNode => (
  <React.StrictMode>
    <StoreProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StoreProvider>
  </React.StrictMode>
);

if (typeof window === 'undefined') {
  ReactDOM.hydrateRoot(document.getElementById('root') as HTMLElement, appComponents());
} else {
  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(appComponents());
}

registerSW();
