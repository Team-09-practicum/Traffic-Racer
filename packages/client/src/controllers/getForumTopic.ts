import { isAxiosError } from 'axios';
import { api } from '@/utils/api';
import { showNetworkError } from '@/utils/showNetworkError';
import { ITopicDTO } from '@/typings/ITopicDTO';

export const getForumTopic = async (topicId: number): Promise<ITopicDTO> => {
  const forumTopic = await api.getForumTopic({
    urlParams: { id: topicId },
    onError: (err) => {
      if (isAxiosError(err) && err.response) {
        showNetworkError(err.response.data.reason);
      }
      throw Error(err.message);
    },
  });
  return forumTopic as ITopicDTO;
};
