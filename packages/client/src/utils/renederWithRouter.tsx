import { render } from '@testing-library/react';
import React, { ReactElement } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { AppRouter } from './router/AppRouter';
import { StoreProvider } from './store/StoreProvider';

export const renderWithRouter = ({ route = '/' }, component?: ReactElement) => {
  window.history.pushState({}, 'Test page', route);
  render(
    <StoreProvider>
      <MemoryRouter initialEntries={[route]}>
        <AppRouter />
        {component}
      </MemoryRouter>
    </StoreProvider>
  );
};
