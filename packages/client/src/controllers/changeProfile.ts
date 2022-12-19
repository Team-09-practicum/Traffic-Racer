import { IUser } from '@/typings/IUser';
import { api } from '@/utils/api';
import { showNetworkError } from '@/utils/showNetworkError';

export const changeProfile = async (data: IUser) => {
  await api.putProfileChange({
    data,
    onError: (err) => showNetworkError(err.response.data.reason),
  });
};
