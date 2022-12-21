import { Link } from 'react-router-dom';
import React from 'react';
import { appRoutes } from '@/utils/router/appRoutes';
import './ErrorPage.scss';

interface IErrorPage {
  nameError: string;
  textError: string;
}

export const ErrorPage = ({ nameError, textError }: IErrorPage) => (
  <div className="error-page">
    <div className="error-page__text">
      <h1 className="error-page__title">Ошибка {nameError}</h1>
      <p className="error-page__subtitle">{textError}</p>
    </div>
    <Link className="error-page__link" to={appRoutes.game}>
      Главное меню
    </Link>
  </div>
);
