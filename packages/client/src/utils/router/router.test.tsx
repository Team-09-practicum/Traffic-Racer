import { screen } from '@testing-library/react';
import { renderWithRouter } from '../renederWithRouter';

describe('Router', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      value: jest.fn(() => ({
        matches: true,
        addListener: jest.fn(),
        removeListener: jest.fn(),
      })),
    });
  });

  // TODO: раскомментировать этот тест, когда на главной странице будет игра
  // test('should correct render home page', () => {
  //   act(() => {
  //     const route = '/';
  //     renderWithRouter({ route });
  //   });
  //   const main = document.querySelector('.game-page');
  //   expect(main).toBeInTheDocument();
  // });

  test('should correct navigate on stats page', () => {
    const route = '/stats';
    renderWithRouter({ route });
    expect(window.location.pathname).toBe('/stats');
    const statsTable = document.querySelector('.stats-page__table') as HTMLElement;
    expect(statsTable).toBeInTheDocument();
  });

  test('should correct navigate on forum page', () => {
    const route = '/forum';
    renderWithRouter({ route });
    expect(window.location.pathname).toBe('/forum');
    const forumTable = document.querySelector('.forum-page__table') as HTMLElement;
    expect(forumTable).toBeInTheDocument();
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
    renderWithRouter({ route });
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
