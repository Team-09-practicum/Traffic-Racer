import { api } from '@/utils/api';
import { showNetworkError } from '@/utils/showNetworkError';

export interface IOAuthSigninData {
  code: string;
  redirect_uri: string;
}

export const signInWithOAuth = async (data: IOAuthSigninData) => {
  const response = await api.postSignInOAuth({
    data,
    onError: (err) => showNetworkError(err.response.data.reason),
  });
  return response;
};
