import React from 'react';
import { Typography } from 'antd';
import { appRoutes } from '@/utils/router/appRoutes';
import { Link } from '@/components';
import './ErrorPage.scss';

interface IErrorPage {
  nameError: string;
  textError: string;
}

export const ErrorPage = ({ nameError, textError }: IErrorPage) => (
  <div className="error-page">
    <div className="error-page__text">
      <Typography.Title level={1} className="error-page__title">
        Ошибка {nameError}
      </Typography.Title>
      <Typography className="error-page__subtitle">{textError}</Typography>
    </div>
    <Link className="error-page__link" to={appRoutes.game}>
      На главную
    </Link>
  </div>
);
