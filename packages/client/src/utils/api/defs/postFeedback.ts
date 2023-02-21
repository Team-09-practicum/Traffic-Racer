import { apiPaths } from '@/utils/constants';
import { createApiDef } from '../createApiDef';

export const postFeedback = createApiDef({
  baseURL: '/',
  url: apiPaths.postFeedback,
  type: 'post',
});
