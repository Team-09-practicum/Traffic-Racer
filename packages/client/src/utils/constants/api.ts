/* eslint-disable no-undef */
/* eslint-disable max-len */

export const API_HOST = 'https://ya-praktikum.tech';

export const API_PATH = '/api/v2';

// eslint-disable-next-line no-undef
export const redirectURI = __OAUTH_REDIRECT_URI__;

export const yandexOAuthUrl = 'https://oauth.yandex.ru/authorize/';

export const telegramFeedbackURL = `https://api.telegram.org/bot${__TELEGRAM_FEEDBACK_TOKEN__}/sendMessage?chat_id=${__TELEGRAM_CHAT_ID__}&parse_mode=html`;

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
  postFeedback: '/api/feedback/send',
};
