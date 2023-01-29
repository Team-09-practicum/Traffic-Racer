import { isAxiosError } from 'axios';
import { api } from '@/utils/api';
import { showNetworkError } from '@/utils/showNetworkError';
import { ICommentDTO } from '@/typings/ICommentDTO';

type ICreateForumComment = Omit<ICommentDTO, 'id' | 'lvl' | 'createdAt' | 'comments'>;
type ICreateForumCommentResponse = Omit<ICommentDTO, 'lvl' | 'comments'>;

export const createForumComment = async (
  createTopicData: ICreateForumComment
): Promise<ICreateForumCommentResponse> => {
  const comment = await api.postTopicReply({
    data: createTopicData,
    onError: (err) => {
      if (isAxiosError(err) && err.response) {
        showNetworkError(err.response.data.reason);
      }
      throw Error(err.message);
    },
  });
  return comment as ICreateForumCommentResponse;
};
