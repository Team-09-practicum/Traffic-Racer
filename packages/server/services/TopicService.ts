/* eslint-disable class-methods-use-this */
import { literal } from 'sequelize';
import Topic, { ITopicCreationAttributes } from '../models/Topic';

class TopicService {
  public create(data: ITopicCreationAttributes) {
    return Topic.create(data);
  }

  public get(topicId: number) {
    return Topic.findByPk(topicId, { raw: true });
  }

  public getAll() {
    return Topic.findAll({
      attributes: {
        exclude: ['body', 'createdAt'],
        include: [
          [literal('(SELECT COUNT(*)::int FROM comments where comments."topicId" = "Topic"."id")'), 'commentsCount'],
          [
            literal('(SELECT MAX(comments."createdAt") FROM comments where comments."topicId" = "Topic"."id")'),
            'lastCommentDate',
          ],
        ],
      },
    });
  }
}

export const topicService = new TopicService();
