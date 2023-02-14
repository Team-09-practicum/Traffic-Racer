import { Router } from 'express';
import bodyParser from 'body-parser';
import { feedbackRoute } from '../controllers/feedbackController';

const jsonBodyParser = () => bodyParser.json();

const feedbackRouter: Router = Router();

feedbackRouter.use('/feedback', jsonBodyParser(), feedbackRoute);

export { feedbackRouter };
