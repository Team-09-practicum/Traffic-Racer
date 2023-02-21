import { isDev } from './isDev';

export const API_HOST = isDev() ? 'http://localhost' : 'https://traffic-racer.ru';

export const API_PATH = '/api/v2';

// eslint-disable-next-line no-undef
export const redirectURI = __OAUTH_REDIRECT_URI__;

export const yandexOAuthUrl = 'https://oauth.yandex.ru/authorize/';

export const apiPaths = {
  postSignUp: '/auth/signup',
  postSignIn: '/auth/signin',
  getUser: '/auth/user',
  postLogout: '/auth/logout',
  postLeaderboard: '/leaderboard',
  postTeamLeaderboard: '/leaderboard/Team09',
  putPassword: '/user/password',
  putAvatar: '/user/profile/avatar',
  putProfile: '/user/profile',
  showAvatar: `${API_HOST}${API_PATH}/resources`,
  signInURI: '/oauth/yandex',
  getForumIndex: '/api/forum',
  getForumTopic: '/api/forum/topic',
  postForumTopic: '/api/forum/topic',
  postTopicReply: '/api/forum/topic/comment',
  userTheme: '/api/theme/',
};
