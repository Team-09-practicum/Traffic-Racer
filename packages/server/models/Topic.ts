/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Optional } from 'sequelize';
import { Column, DataType, Model, Table, AllowNull } from 'sequelize-typescript';

export interface ITopicModel {
  id: number;
  name: string;
  body: string;
  userId: number;
  userName: string;
}

export type ITopicCreationAttributes = Optional<ITopicModel, 'id'>;

@Table({
  tableName: 'topics',
  timestamps: true,
  updatedAt: false,
})
class Topic extends Model<ITopicModel, ITopicCreationAttributes> {
  @AllowNull(false)
  @Column(DataType.STRING)
  name!: string;

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

export default Topic;
