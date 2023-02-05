import React from 'react';
import { act, render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { StoreProvider } from './utils/store/StoreProvider';
import App from './App';

jest.mock('./utils/router/AppRouter');

// @ts-ignore
global.fetch = jest.fn(() => Promise.resolve({ json: () => Promise.resolve('hey') }));
describe('fetchUserThunk', () => {
  test('Example test', async () => {
    await act(async () => {
      render(
        <StoreProvider>
          <Router>
            <App />
          </Router>
        </StoreProvider>
      );
    });
    const layout = document.querySelector('.layout') as HTMLElement;
    expect(layout).toBeInTheDocument();
  });
});
