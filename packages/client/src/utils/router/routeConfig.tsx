import { RouteProps } from 'react-router-dom'
import { AuthPage } from '../../pages/authPage/AuthPage'
import { Error404Page } from '../../pages/error404Page/Error404Page'
import { Error500Page } from '../../pages/error500Page/Error500Page'
import { ForumPage } from '../../pages/forumPage/ForumPage'
import { GamePage } from '../../pages/gamePage/GamePage'
import { MainPage } from '../../pages/mainPage/MainPage'
import { RegistrationPage } from '../../pages/registrationPage/RegistrationPage'
import { StatsPage } from '../../pages/statsPage/StatsPage'
import { UserInfoPage } from '../../pages/userInfoPage/UserInfoPage'

export enum AppRoutes {
  MAIN = 'main',
  GAME = 'game',
  AUTH = 'auth',
  REGISTRATION = 'registation',
  USERINFO = 'userinfo',
  STATS = 'stats',
  FORUM = 'forum',
  ERROR404 = 'error404',
  ERROR500 = 'error500',
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: '/',
  [AppRoutes.GAME]: '/game',
  [AppRoutes.AUTH]: '/auth',
  [AppRoutes.REGISTRATION]: '/registration',
  [AppRoutes.USERINFO]: '/userinfo',
  [AppRoutes.STATS]: '/stats',
  [AppRoutes.FORUM]: '/forum',
  [AppRoutes.ERROR404]: '*',
  [AppRoutes.ERROR500]: '/500',
}

export const routeConfig: Record<AppRoutes, RouteProps> = {
  [AppRoutes.MAIN]: {
    path: RoutePath.main,
    element: <MainPage />,
  },
  [AppRoutes.GAME]: {
    path: RoutePath.game,
    element: <GamePage />,
  },
  [AppRoutes.AUTH]: {
    path: RoutePath.auth,
    element: <AuthPage />,
  },
  [AppRoutes.REGISTRATION]: {
    path: RoutePath.registation,
    element: <RegistrationPage />,
  },
  [AppRoutes.USERINFO]: {
    path: RoutePath.userinfo,
    element: <UserInfoPage />,
  },
  [AppRoutes.STATS]: {
    path: RoutePath.stats,
    element: <StatsPage />,
  },
  [AppRoutes.FORUM]: {
    path: RoutePath.forum,
    element: <ForumPage />,
  },
  [AppRoutes.ERROR404]: {
    path: RoutePath.error404,
    element: <Error404Page />,
  },
  [AppRoutes.ERROR500]: {
    path: RoutePath.error500,
    element: <Error500Page />,
  },
}
