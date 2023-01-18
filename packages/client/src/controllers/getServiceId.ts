import { api } from '@/utils/api';
import { showNetworkError } from '@/utils/showNetworkError';

export const getServiceId = async () => {
  const serviceId = await api.getOAuthServiceId({
    onSuccess: (res) => {
      // eslint-disable-next-line no-console
      console.log('%cResponse = ', 'color: green', res);
    },
    onError: (err) => showNetworkError(err.response.data.reason),
  });
  return serviceId;
};
