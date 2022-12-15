import { Link } from 'react-router-dom';
import React, { useCallback } from 'react';
import { appRoutes } from '@/utils/router/appRoutes';
import { logout } from '@/controllers/logout';

export const MainPage = () => {
  const logoutProcess = useCallback(() => logout(), []);

  return (
    <div className="main-page">
      Гланое меню
      <Link to={appRoutes.auth}> Авторизация </Link>
      <Link to={appRoutes.stats}> Лидерборд </Link>
      <Link to={appRoutes.forum}> Форум </Link>
      <Link to={appRoutes.game}> Игра </Link>
      <Link to={appRoutes.userinfo}> Настройка игрока </Link>
      <button type="button" onClick={logoutProcess}>
        Выйти
      </button>
    </div>
  );
};
