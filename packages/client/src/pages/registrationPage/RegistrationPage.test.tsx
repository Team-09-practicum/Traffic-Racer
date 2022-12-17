import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { ConfigProvider } from 'antd';
import { RegistrationPage } from './RegistrationPage';
import { mockMedia } from '@/utils/test/mockMedia';

jest.mock('react-router-dom');
mockMedia(); // used to avoid error
describe('pages/RegistrationPage', () => {
  it('should render registrationPage', () => {
    const page = render(
      <ConfigProvider theme={{ hashed: false }}>
        <RegistrationPage />
      </ConfigProvider>
    );
    expect(page).toMatchSnapshot();
  });
});
