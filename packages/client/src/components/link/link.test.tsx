import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Link } from '@/components';

export {};

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => mockedUsedNavigate,
}));

describe('Link Component', () => {
  test('should render link', () => {
    render(
      <Router>
        <Link to="test">Some Page</Link>
      </Router>
    );
    const link: HTMLAnchorElement = screen.getByRole('link');
    expect(link).toBeInTheDocument();
  });

  describe('Link component props', () => {
    test('should have href', () => {
      const dummyText = 'some-page';
      const dummyHref = `/${dummyText}`;
      render(
        <Router>
          <Link to="/some-page">{dummyText}</Link>
        </Router>
      );
      const link: HTMLAnchorElement = screen.getByRole('link');
      expect(link.textContent).toEqual(dummyText);
      expect(link.href).toContain(dummyHref);
    });

    test('should have a className', () => {
      const dummyClassName = 'test-class-name';
      render(
        <Router>
          <Link to="/some-page" className={dummyClassName}>
            Some Page
          </Link>
        </Router>
      );
      const link: HTMLAnchorElement = screen.getByRole('link');
      expect(link).toHaveClass(dummyClassName);
    });

    test('should have a target tag', () => {
      render(
        <Router>
          <Link to="/some-page">Some Page</Link>
        </Router>
      );
      const link: HTMLAnchorElement = screen.getByRole('link');
      expect(link).toHaveAttribute('target');
    });

    test('should handle router link', () => {
      render(
        <div>
          <Router>
            <Link to="/dummy" isRouter>
              Dummy
            </Link>
          </Router>
        </div>
      );
      const link: HTMLAnchorElement = screen.getByRole('link');
      fireEvent.click(link);
      expect(mockedUsedNavigate).toHaveBeenCalledWith('/dummy');
    });
  });
});
