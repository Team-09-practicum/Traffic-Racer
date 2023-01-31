import { ICommentDTO } from '@/typings/ICommentDTO';

export interface ITopicDTO {
  id: number;
  name: string;
  body: string;
  userId: number;
  userName: string;
  createdAt: string;
  comments: ICommentDTO[];
}
