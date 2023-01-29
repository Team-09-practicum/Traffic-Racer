export interface ICommentDTO {
  id: number;
  topicId: number;
  parentId: number | null;
  lvl: number;
  body: string;
  createdAt: string;
  userId: number;
  userName: string;
  comments: ICommentDTO[];
}
