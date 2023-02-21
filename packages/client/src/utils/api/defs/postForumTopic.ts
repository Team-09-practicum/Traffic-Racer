import { apiPaths } from '@/utils/constants';
import { createApiDef } from '../createApiDef';

export const postForumTopic = createApiDef({
  baseURL: '/',
  url: apiPaths.postForumTopic,
  type: 'post',
});
