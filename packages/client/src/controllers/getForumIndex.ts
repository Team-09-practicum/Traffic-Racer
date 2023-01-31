import { isAxiosError } from 'axios';
import { api } from '@/utils/api';
import { showNetworkError } from '@/utils/showNetworkError';
import { ITopic } from '@/typings/ITopic';

export const getForumIndex = async (): Promise<ITopic[]> => {
  const forumIndex = await api.getForumIndex({
    onError: (err) => {
      if (isAxiosError(err) && err.response) {
        showNetworkError(err.response.data.reason);
      }
      throw Error(err.message);
    },
  });
  return forumIndex as ITopic[];
};
