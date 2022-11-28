import { Routes, Route } from 'react-router-dom';
import React from 'react';
import { RoutePath } from './routeConfig';

import { AuthPage } from '@/pages/authPage/AuthPage';
import { ErrorPage } from '@/pages/errorPage/ErrorPage';
import { ForumPage } from '@/pages/forumPage/ForumPage';
import { GamePage } from '@/pages/gamePage/GamePage';
import { MainPage } from '@/pages/mainPage/MainPage';
import { RegistrationPage } from '@/pages/registrationPage/RegistrationPage';
import { StatsPage } from '@/pages/statsPage/StatsPage';
import { UserInfoPage } from '@/pages/userInfoPage/UserInfoPage';

export const AppRouter = () => (
  <Routes>
    <Route path={RoutePath.main} element={MainPage()} />
    <Route path={RoutePath.game} element={GamePage()} />
    <Route path={RoutePath.auth} element={AuthPage()} />
    <Route path={RoutePath.registration} element={RegistrationPage()} />
    <Route path={RoutePath.userinfo} element={UserInfoPage()} />
    <Route path={RoutePath.stats} element={StatsPage()} />
    <Route path={RoutePath.forum} element={ForumPage()} />
    <Route
      path={RoutePath.error404}
      element={ErrorPage({
        nameError: '404',
        textError: 'Страница не существует',
      })}
    />
    <Route
      path={RoutePath.error500}
      element={ErrorPage({ nameError: '500', textError: 'Мы уже фиксим' })}
    />
  </Routes>
);
