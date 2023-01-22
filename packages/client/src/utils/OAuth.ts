/* eslint-disable camelcase */
import { signInWithOAuth } from '@/controllers/signInWithOAuth';
import { showNetworkError } from '@/utils/showNetworkError';
import { redirectURI, yandexOAuthUrl } from '@/utils/constants';

export interface IGetServiceIdResponse {
  service_id: string;
}

/**
 * Получаем id и делаем редирект на яндекс, а с яндекса на главную, с кодом авторизации.
 */

export const signinWithYandex = async () => {
  try {
    const service_id = 'f87b01be2bb74c66a7dbc553dc5910d2';

    const url = new URL(yandexOAuthUrl);

    url.searchParams.set('client_id', service_id);
    url.searchParams.set('redirect_uri', redirectURI);
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

    window.location.href = '/';
  } catch (error) {
    showNetworkError();
  }
};
