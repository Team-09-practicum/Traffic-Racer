/* eslint-disable no-console */
import { api } from '@/utils/api';

export const logoutController = async () => {
  await api.postLogout({
    data: {},
    onSuccess: (res) => console.log('%cResponse = ', 'color: green', res),
  });
};
