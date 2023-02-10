import { telegramFeedbackURL } from '@/utils/constants';
import { createApiDef } from '../createApiDef';

export const postFeedbackToTelegram = createApiDef({
  withCredentials: false,
  url: telegramFeedbackURL,
  type: 'post',
  parse_mode: 'HTML',
  headers: { 'Content-Type': 'application/json' },
});
