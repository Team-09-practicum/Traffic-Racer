import { Link } from 'react-router-dom';
import React from 'react';
import { RoutePath } from '@/utils/router/routeConfig';
import { logoutController } from '@/controllers/logoutController';

export const MainPage = () => {
  const logout = () => logoutController();

  return (
    <div>
      Гланое меню
      <Link to={RoutePath.auth}> Авторизация </Link>
      <Link to={RoutePath.stats}> Лидерборд </Link>
      <Link to={RoutePath.forum}> Форум </Link>
      <Link to={RoutePath.game}> Игра </Link>
      <Link to={RoutePath.userinfo}> Настройка игрока </Link>
      <button type="button" onClick={logout}>
        Выйти
      </button>
    </div>
  );
};
