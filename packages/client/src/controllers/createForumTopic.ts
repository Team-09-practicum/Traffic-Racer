import { isAxiosError } from 'axios';
import { api } from '@/utils/api';
import { showNetworkError } from '@/utils/showNetworkError';

export interface ICreateTopicData {
  name: string;
  body: string;
  userId: number;
  userName: string;
}

export const createForumTopic = async (createTopicData: ICreateTopicData): Promise<void> => {
  await api.postForumTopic({
    data: createTopicData,
    onError: (err) => {
      if (isAxiosError(err) && err.response) {
        showNetworkError(err.response.data.reason);
      }
      throw Error(err.message);
    },
  });
};
