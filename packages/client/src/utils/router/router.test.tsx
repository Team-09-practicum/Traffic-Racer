import { act, screen } from '@testing-library/react';
import { DeepPartial } from '@reduxjs/toolkit';
import { IStateSchema } from '@/typings/IStateSchema';
import { renderWithRouter } from '../renederWithRouter';

jest.mock('@/pages/gamePage/components/TrafficRacer/TrafficRacer');

describe('Router', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      value: jest.fn(() => ({
        matches: true,
        addListener: jest.fn(),
        removeListener: jest.fn(),
      })),
    });

    Object.defineProperty(global.navigator, 'geolocation', {
      writable: true,
      value: {
        getCurrentPosition: jest.fn(),
      },
    });
  });

  test('should correct render home page', () => {
    act(() => {
      const route = '/';
      renderWithRouter({ route });
    });
    const main = document.querySelector('.game-page');
    expect(main).toBeInTheDocument();
  });

  test('should correct navigate on stats page', () => {
    const route = '/stats';
    renderWithRouter({ route });
    expect(window.location.pathname).toBe('/stats');
  });

  test('should correct navigate on forum page', () => {
    const route = '/forum';
    renderWithRouter({ route });
    expect(window.location.pathname).toBe('/forum');
  });
  test('should correct navigate on auth page', () => {
    const route = '/auth';
    renderWithRouter({ route });
    expect(window.location.pathname).toBe('/auth');
    const auth = document.querySelector('.auth-page') as HTMLElement;
    const title = screen.getByText(/вход/i);
    expect(auth).toBeInTheDocument();
    expect(title).toBeInTheDocument();
  });

  test('should correct navigate on profile page', () => {
    const route = '/userinfo';
    const store: DeepPartial<IStateSchema> = {
      user: {
        userInfo: {
          id: 1,
        },
      },
    };
    renderWithRouter({ route }, store as IStateSchema);
    expect(window.location.pathname).toBe('/userinfo');
    const profile = document.querySelector('.profile-page') as HTMLElement;
    const title = screen.getByText(/профиль/i);
    expect(profile).toBeInTheDocument();
    expect(title).toBeInTheDocument();
  });

  test('should render error page if route is wrong', () => {
    const route = '/test';
    renderWithRouter({ route });
    expect(window.location.pathname).toBe('/test');
    const title = screen.getByText(/404/i);
    const error = document.querySelector('.error-page') as HTMLElement;
    expect(error).toBeInTheDocument();
    expect(title).toBeInTheDocument();
  });
});
