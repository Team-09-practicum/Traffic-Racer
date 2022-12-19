import { api } from '@/utils/api';
import { showNetworkError } from '@/utils/showNetworkError';

export const changeAvatar = async (form: FormData) => {
  const newAvatar = await api.putAvatarChange({
    data: form,
    onError: (err) => showNetworkError(err.response.data.reason),
  });
  return newAvatar;
};
