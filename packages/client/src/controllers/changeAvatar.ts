import { isAxiosError } from 'axios';
import { api } from '@/utils/api';
import { showNetworkError } from '@/utils/showNetworkError';

export const changeAvatar = async (form: FormData) => {
  const newAvatar = await api.putAvatarChange({
    data: form,
    onError: (err) => {
      if (isAxiosError(err) && err.response) {
        showNetworkError(err.response.data.reason);
      }
      throw Error(err.message);
    },
  });
  return newAvatar;
};
