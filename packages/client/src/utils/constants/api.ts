export const API_HOST = 'https://ya-praktikum.tech';

export const API_PATH = '/api/v2';

export const redirectURI = 'http://localhost:3000';

export const yandexOAuthUrl = `https://oauth.yandex.ru/authorize?response_type=code`;

export const apiPaths = {
  postSignUp: '/auth/signup',
  postSignIn: '/auth/signin',
  getUser: '/auth/user',
  postLogout: '/auth/logout',
  putPassword: '/user/password',
  putAvatar: '/user/profile/avatar',
  putProfile: '/user/profile',
  showAvatar: `${API_HOST}${API_PATH}/resources`,
  getServiceIdURI: '/oauth/yandex/service-id?redirect_uri=http%3A%2F%2Flocalhost%3A3000',
  signInURI: `${API_HOST}${API_PATH}/oauth/yandex`,
};
