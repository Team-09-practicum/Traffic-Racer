import { render } from '@testing-library/react';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { StoreProvider } from './utils/store/StoreProvider';
import App from './App';

jest.mock('./utils/router/AppRouter');

// @ts-ignore
global.fetch = jest.fn(() => Promise.resolve({ json: () => Promise.resolve('hey') }));

test('Example test', async () => {
  render(
    <StoreProvider>
      <Router>
        <App />
      </Router>
    </StoreProvider>
  );
});
