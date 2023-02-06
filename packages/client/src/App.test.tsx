import React from 'react';
import { act, render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { StoreProvider } from './utils/store/StoreProvider';
import App from './App';
import { AppRouter } from './utils/router/AppRouter';

jest.mock('./utils/router/AppRouter');

describe('App.test', () => {
  test('should check that components was rendered', async () => {
    await act(async () => {
      render(
        <StoreProvider>
          <Router>
            <App />
          </Router>
        </StoreProvider>
      );
    });
    expect(screen.getByTestId('layoutAntDesign')).toBeInTheDocument();
    expect(screen.getByTestId('navigation')).toBeInTheDocument();
    expect(screen.getByTestId('content')).toBeInTheDocument();
    expect(screen.getByTestId('switch')).toBeInTheDocument();
    expect(AppRouter).toBeCalled();
  });
});
