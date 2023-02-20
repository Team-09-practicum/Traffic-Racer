import { Routes, Route, Navigate } from 'react-router-dom';
import React from 'react';
import { appRoutes } from './appRoutes';

import { AuthPage } from '@/pages/authPage/AuthPage';
import { ErrorPage } from '@/pages/errorPage/ErrorPage';
import { ForumPage } from '@/pages/forumPage/ForumPage';
import { TopicPage } from '@/pages/topicPage/TopicPage';
import { GamePage } from '@/pages/gamePage/GamePage';
import { RegistrationPage } from '@/pages/registrationPage/RegistrationPage';
import { StatsPage } from '@/pages/statsPage/StatsPage';
import { UserInfoPage } from '@/pages/userInfoPage/UserInfoPage';
import { ChangePasswordPage } from '@/pages/changePasswordPage/ChangePasswordPage';
import { RequireAuth } from './RequireAuth';
import { WithoutAuth } from './WithoutAuth';

export const AppRouter = () => {
  let oauthCode;
  if (typeof window !== 'undefined') {
    const query = new URLSearchParams(window.location.search);
    oauthCode = query.get('code');
  }

  return (
    <Routes>
      <Route path={appRoutes.game} element={<GamePage />} />
      <Route
        path={appRoutes.auth}
        element={
          <WithoutAuth>
            <AuthPage />
          </WithoutAuth>
        }
      />
      <Route
        path={appRoutes.registration}
        element={
          <WithoutAuth>
            <RegistrationPage />
          </WithoutAuth>
        }
      />
      <Route
        path={appRoutes.userinfo}
        element={
          <RequireAuth>
            <UserInfoPage />
          </RequireAuth>
        }
      />
      <Route
        path={appRoutes.changePassword}
        element={
          <RequireAuth>
            <ChangePasswordPage />
          </RequireAuth>
        }
      />
      <Route path={appRoutes.stats} element={<StatsPage />} />
      <Route path={appRoutes.forum} element={<ForumPage />} />
      <Route
        path={appRoutes.topic}
        element={
          <RequireAuth>
            <TopicPage />
          </RequireAuth>
        }
      />
      <Route path={appRoutes.error404} element={<ErrorPage nameError="404" textError="Страница не существует" />} />
      <Route path={appRoutes.error500} element={<ErrorPage nameError="500" textError="Мы уже фиксим" />} />
      <Route
        path={appRoutes.redirectFromYandexOAuth}
        element={<Navigate to={`${appRoutes.game}?code=${oauthCode}`} />}
      />
      <Route path="*" element={<ErrorPage nameError="404" textError="Страница не существует" />} />
    </Routes>
  );
};
