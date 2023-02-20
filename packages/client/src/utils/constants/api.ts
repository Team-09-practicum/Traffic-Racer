import { isDev } from './isDev';

export const API_HOST = isDev() ? 'http://localhost' : 'http://traffic-racer.ru';

export const API_PATH = '/api/v2';

export const LOCAL_SERVER_PORT = 5000;

export const redirectURI = `http://localhost:${LOCAL_SERVER_PORT}/`;

export const yandexOAuthUrl = 'https://oauth.yandex.ru/authorize?response_type=code';

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
  getServiceIdURI: '/oauth/yandex/service-id',
  signInURI: '/oauth/yandex',
  getForumIndex: '/api/forum',
  getForumTopic: '/api/forum/topic',
  postForumTopic: '/api/forum/topic',
  postTopicReply: '/api/forum/topic/comment',
  userTheme: '/api/theme/',
};
