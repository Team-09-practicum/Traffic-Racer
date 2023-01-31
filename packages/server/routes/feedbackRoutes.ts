import { Router } from 'express';
import { feedbackRoute } from '../controllers/feedbackController';

const feedbackRouter: Router = Router();

feedbackRouter.use('/feedback', feedbackRoute);
