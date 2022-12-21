import { api } from '@/utils/api';
import { showNetworkError } from '@/utils/showNetworkError';

export interface IChangePassword {
  oldPassword: string;
  newPassword: string;
}

export const changePassword = async (passwords: IChangePassword) => {
  await api.putPasswordChange({
    data: passwords,
    onSuccess: () => window.history.go(-1),
    onError: (err) => showNetworkError(err.response.data.reason),
  });
};
