import type { Request, Response, NextFunction } from 'express';
import { topicService } from '../services/TopicService';
import type { ITopicCreationAttributes, ITopicModel } from '../models/Topic';
import type { ICommentCreationAttributes } from '../models/Comment';
import { commentService } from '../services/CommentService';
import { sanitizeRichText } from '../utils/sanitizeRichText';

export class ForumAPI {
  public static listTopics = async (_: Request, res: Response, next: NextFunction) => {
    try {
      const topics = await topicService.getAll();

      res.status(200).json(topics);
    } catch (err) {
      res.status(500).json({ reason: `ForumAPI list topics error: ${err}` });
      next(err);
    }
  };

  public static getTopic = async (
    req: Request<unknown, unknown, unknown, Pick<ITopicModel, 'id'>>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.query;
      if (!id) {
        res.status(400).json({ reason: 'Empty query' });
      }
      const topic = await topicService.get(id);
      const comments = await commentService.getByTopicId(id);

      if (topic)
        await res.status(200).json({
          ...topic,
          comments,
        });
    } catch (err) {
      res.status(500).json({ reason: `ForumAPI list topics error: ${err}` });
      next(err);
    }
  };

  public static createTopic = async (
    req: Request<unknown, unknown, ITopicCreationAttributes, unknown>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      req.body.name = sanitizeRichText(req.body.name);
      req.body.body = sanitizeRichText(req.body.body);

      const topic = await topicService.create(req.body);
      res.status(201).json({ topic });
    } catch (err) {
      res.status(500).json({ reason: `ForumAPI create topic error: ${err}` });
      next(err);
    }
  };

  public static createComment = async (
    req: Request<unknown, unknown, ICommentCreationAttributes, unknown>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      req.body.body = sanitizeRichText(req.body.body);

      const comment = await commentService.create(req.body);
      res.status(201).json({ comment });
    } catch (err) {
      res.status(500).json({ reason: `ForumAPI create comment error: ${err}` });
      next(err);
    }
  };
}
