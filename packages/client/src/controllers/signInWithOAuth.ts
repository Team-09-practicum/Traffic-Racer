import { isAxiosError } from 'axios';
import { api } from '@/utils/api';
import { showNetworkError } from '@/utils/showNetworkError';

export interface IOAuthSigninData {
  code: string;
  redirect_uri: string;
}

export const signInWithOAuth = async (data: IOAuthSigninData) => {
  await api.postSignInOAuth({
    data,
    onError: (err) => {
      if (isAxiosError(err) && err.response) {
        showNetworkError(err.response.data.reason);
      }
      throw Error(err.message);
    },
  });
};
