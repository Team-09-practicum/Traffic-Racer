import { render } from '@testing-library/react';
import React, { ReactElement } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { AppRouter } from './router/AppRouter';
import { StoreProvider } from './store/StoreProvider';
import { IStateSchema } from '@/typings/IStateSchema';

export const renderWithRouter = ({ route = '/' }, store?: IStateSchema, component?: ReactElement) => {
  window.history.pushState({}, 'Test page', route);
  render(
    <StoreProvider initialState={store}>
      <MemoryRouter initialEntries={[route]}>
        <AppRouter />
        {component}
      </MemoryRouter>
    </StoreProvider>
  );
};
