import { render, screen } from '@testing-library/react';
import React from 'react';
import App from './App';

jest.mock('./utils/router/AppRouter');
const appContent = 'Вот тут будет жить ваше приложение :)';

// @ts-ignore
global.fetch = jest.fn(() => Promise.resolve({ json: () => Promise.resolve('hey') }));

test('Example test', async () => {
  render(<App />);
  expect(screen.getByText(appContent)).toBeDefined();
});
