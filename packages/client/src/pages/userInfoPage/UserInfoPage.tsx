import { Link } from 'react-router-dom';
import React from 'react';
import { RoutePath } from '@/utils/router/routeConfig';

export const UserInfoPage = () => (
  <div>
    userInfoPage
    <Link to={RoutePath.main}> Главное меню </Link>
  </div>
);
