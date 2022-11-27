import { Link } from 'react-router-dom';
import React from 'react';
import { RoutePath } from '@/utils/router/routeConfig';

export const AuthPage = () => (
  <div>
    Авторизация
    <Link to={RoutePath.main}> Главное меню </Link>
    <Link to={RoutePath.registration}> Регистрация </Link>
  </div>
);
