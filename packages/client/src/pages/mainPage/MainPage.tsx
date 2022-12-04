import { Link } from 'react-router-dom';
import React, { useCallback } from 'react';
import { RoutePath } from '@/utils/router/routeConfig';
import { logout } from '@/controllers/logout';

export const MainPage = () => {
  const logoutProcess = useCallback(() => logout(), []);

  return (
    <div>
      Гланое меню
      <Link to={RoutePath.auth}> Авторизация </Link>
      <Link to={RoutePath.stats}> Лидерборд </Link>
      <Link to={RoutePath.forum}> Форум </Link>
      <Link to={RoutePath.game}> Игра </Link>
      <Link to={RoutePath.userinfo}> Настройка игрока </Link>
      <button type="button" onClick={logoutProcess}>
        Выйти
      </button>
    </div>
  );
};
