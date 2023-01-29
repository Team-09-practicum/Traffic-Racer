import { apiPaths } from '@/utils/constants';
import { createApiDef } from '../createApiDef';

export const getForumTopic = createApiDef({
  baseURL: '/',
  url: apiPaths.getForumTopic,
  type: 'get',
});
