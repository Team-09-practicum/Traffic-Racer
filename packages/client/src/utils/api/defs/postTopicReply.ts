import { apiPaths } from '@/utils/constants';
import { createApiDef } from '../createApiDef';

export const postTopicReply = createApiDef({
  baseURL: '/',
  url: apiPaths.postTopicReply,
  type: 'post',
});
