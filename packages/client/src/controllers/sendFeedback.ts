import { isAxiosError } from 'axios';
import { api } from '@/utils/api';
import { showNetworkError } from '@/utils/showNetworkError';

export interface SendRequestData {
  first_name: string;
  email: string;
  message: string;
}

export const sendFeedback = async (data: SendRequestData) => {
  const feedbackMessage = await api.postFeedback({
    data,
    onError: (err) => {
      if (isAxiosError(err) && err.response) {
        showNetworkError(err.response.data.reason);
      }
      // throw Error(err.message);
    },
  });
  return feedbackMessage as SendRequestData;
};
