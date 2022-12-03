import { api } from '@/utils/api';

export const logout = async () => {
  await api.postLogout({
    data: {},
    // eslint-disable-next-line no-console
    onSuccess: (res) => console.log('%cResponse = ', 'color: green', res),
  });
};
