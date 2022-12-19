import { Link } from 'react-router-dom';
import React from 'react';
import { appRoutes } from '@/utils/router/appRoutes';
import './ErrorPage.scss';

interface IErrorPage {
  nameError: string;
  textError: string;
}

export const ErrorPage = ({ nameError, textError }: IErrorPage) => (
  <div className="error">
    <div className="error__text">
      <h1 className="error__title">Ошибка {nameError}</h1>
      <p className="error__subtitle">{textError}</p>
    </div>
    <Link className="error__link" to={appRoutes.game}>
      Главное меню
    </Link>
  </div>
);
