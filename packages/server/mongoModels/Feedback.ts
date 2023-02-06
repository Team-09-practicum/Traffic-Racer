import { model, Schema } from 'mongoose';

interface IFeedbackModel {
  first_name: string;
  email: string;
  message: string;
}

const feedbackSchema = new Schema<IFeedbackModel>(
  {
    first_name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
  },
  {
    strict: true,
  }
);

export const Feedback = model<IFeedbackModel>('feedback', feedbackSchema);
