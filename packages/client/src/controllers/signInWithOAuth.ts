import { api } from '@/utils/api';
import { showNetworkError } from '@/utils/showNetworkError';

export interface OAuthSigninData {
  code: string;
  redirect_uri: string;
}

export const signInWithOAuth = async (data: OAuthSigninData) => {
  const response = await api.postSignInOAuth({
    data,
    onError: (err) => showNetworkError(err.response.data.reason),
  });
  return response;
};
