import { Router } from 'express';
import { ForumAPI } from '../controllers/forumController';

const forumRouter: Router = Router();

forumRouter.get('/', ForumAPI.listTopics);
forumRouter.get('/topic', ForumAPI.getTopic);
forumRouter.post('/topic', ForumAPI.createTopic);
forumRouter.post('/topic/comment', ForumAPI.createComment);

export { forumRouter };
