/* eslint-disable @typescript-eslint/no-unused-vars */
import { AllowNull, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import type { Optional } from 'sequelize';
import Topic from './Topic';

export interface ICommentModel {
  id: number;
  topicId: number;
  parentCommentId: number | null;
  body: string;
  userId: number;
  userName: string;
}

export type ICommentCreationAttributes = Optional<ICommentModel, 'id'>;

@Table({
  tableName: 'comments',
  timestamps: true,
  updatedAt: false,
})
class Comment extends Model<ICommentModel, ICommentCreationAttributes> {
  @ForeignKey(() => Topic)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  topicId!: number;

  @ForeignKey(() => Comment)
  @Column(DataType.INTEGER)
  parentId?: number;

  @AllowNull(false)
  @Column(DataType.TEXT)
  body!: string;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  userId!: number;

  @AllowNull(false)
  @Column(DataType.STRING(255))
  userName!: string;
}

export default Comment;
