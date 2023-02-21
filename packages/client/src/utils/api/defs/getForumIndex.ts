import { apiPaths } from '@/utils/constants';
import { createApiDef } from '../createApiDef';

export const getForumIndex = createApiDef({
  baseURL: '/',
  url: apiPaths.getForumIndex,
  type: 'get',
});
