import { type Request, type Response, Router } from 'express';
import { Error } from 'mongoose';
import { Feedback } from '../models/Feedback';

export const feedbackRoute = Router().post('/send', async (req: Request, response: Response): Promise<Response> => {
  try {
    const feedback = new Feedback(req.body);
    await feedback.save();
    return response.status(204).send();
  } catch (error) {
    response.status(400);
    if (error instanceof Error.ValidationError) {
      return response.json({ reason: error.message, details: error.errors });
    }

    return response.json({ reason: error instanceof Error ? error.message : 'error' });
  }
});
