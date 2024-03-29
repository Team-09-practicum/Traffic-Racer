import { isAxiosError } from 'axios';
import toast from 'react-hot-toast';
import { api } from '@/utils/api';
import { showNetworkError } from '@/utils/showNetworkError';

export interface SendRequestData {
  first_name: string;
  email: string;
  message: string;
}

export interface SendToTelegramRequestData {
  text: string;
}

export const sendFeedback = async (data: SendRequestData) => {
  await api.postFeedback({
    data,
    onError: (err) => {
      if (isAxiosError(err) && err.response) {
        showNetworkError(err.response.data.reason);
      }
      throw Error(err.message);
    },
  });
};

export const sentFeedbackToTelegram = async (text: SendToTelegramRequestData) => {
  await api.postFeedbackToTelegram({
    data: text,
    onSuccess: () => {
      toast('Ваше сообщение успешно отправлено', {
        position: 'top-center',
        icon: '✅',
      });
    },
    onError: (err) => {
      if (isAxiosError(err) && err.response) {
        showNetworkError(err.response.data.reason);
      }
      throw Error(err.message);
    },
  });
};
