import { api } from '@/utils/api';
import { showNetworkError } from '@/utils/showNetworkError';

export const getServiceId = async () => {
  const serviceId = await api.getOAuthServiceId({
    onError: (err) => showNetworkError(err.response.data.reason),
  });
  return serviceId;
};
