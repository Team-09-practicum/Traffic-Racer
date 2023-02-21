/* eslint-disable camelcase */
import { signInWithOAuth } from '@/controllers/signInWithOAuth';
import { showNetworkError } from '@/utils/showNetworkError';
import { yandexOAuthUrl, redirectURI } from '@/utils/constants';

export interface IGetServiceIdResponse {
  service_id: string;
}

/**
 * Получаем id и делаем редирект на яндекс, а с яндекса на главную, с кодом авторизации.
 */

export const signinWithYandex = async () => {
  try {
    const url = new URL(yandexOAuthUrl);

    // eslint-disable-next-line no-undef
    url.searchParams.set('client_id', __OAUTH_CLIENT_ID__);
    url.searchParams.set('redirect_uri', redirectURI);
    url.searchParams.set('response_type', 'code');
    window.location.href = url.href;
  } catch (error) {
    showNetworkError();
  }
};

/**
 * Отправляем код авторизации на сервер и получаем токен
 */

export const getYandexToken = async (OAuthCode: string) => {
  try {
    await signInWithOAuth({
      code: OAuthCode,
      redirect_uri: redirectURI,
    });
  } catch (error) {
    showNetworkError();
  }
};
