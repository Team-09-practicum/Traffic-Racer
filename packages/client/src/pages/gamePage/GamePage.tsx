import { Link } from 'react-router-dom';
import React from 'react';
import { RoutePath } from '@/utils/router/routeConfig';

export const GamePage = () => (
  <div>
    gamePage
    <Link to={RoutePath.main}> Главное меню </Link>
  </div>
);
