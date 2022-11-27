import { Routes, Route } from 'react-router-dom';
import React from 'react';
import { RoutePath } from './routeConfig';

import { AuthPage } from '@/pages/authPage/AuthPage';
import { Error404Page } from '@/pages/error404Page/Error404Page';
import { Error500Page } from '@/pages/error500Page/Error500Page';
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
    <Route path={RoutePath.error404} element={Error404Page()} />
    <Route path={RoutePath.error500} element={Error500Page()} />
  </Routes>
);
