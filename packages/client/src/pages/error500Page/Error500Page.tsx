import { Link } from 'react-router-dom';
import React from 'react';
import { RoutePath } from '@/utils/router/routeConfig';

export const Error500Page = () => (
  <div>
    Error500Page
    <Link to={RoutePath.main}> Главное меню </Link>
  </div>
);
