import { isAxiosError } from 'axios';
import { Theme } from '@/typings/IUser';
import { api } from '@/utils/api';
import { showNetworkError } from '@/utils/showNetworkError';

export const updateUserTheme = async (data: { userId: number; theme: Theme }) => {
  const response = await api.postUserTheme({
    data,
    onError: (err) => {
      if (isAxiosError(err) && err.response) {
        showNetworkError(err.response.data.reason);
      }
    },
  });
  return response;
};
