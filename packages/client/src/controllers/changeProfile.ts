import { isAxiosError } from 'axios';
import { IUser } from '@/typings/IUser';
import { api } from '@/utils/api';
import { showNetworkError } from '@/utils/showNetworkError';

export const changeProfile = async (data: IUser) => {
  const newProfile = await api.putProfileChange({
    data,
    onError: (err) => {
      if (isAxiosError(err) && err.response) {
        showNetworkError(err.response.data.reason);
      }
      throw Error(err.message);
    },
  });
  return newProfile;
};
