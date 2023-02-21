import { apiPaths } from '@/utils/constants';
import { createApiDef } from '../createApiDef';

export const getUser = createApiDef({
  url: apiPaths.getUser,
  type: 'get',
});
