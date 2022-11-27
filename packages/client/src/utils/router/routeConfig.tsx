export enum AppRoutes {
  MAIN = 'main',
  GAME = 'game',
  AUTH = 'auth',
  REGISTRATION = 'registration',
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
