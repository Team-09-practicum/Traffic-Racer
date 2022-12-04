import { apiPaths } from '@/utils/constants';
import { createApiDef } from '../createApiDef';

export const postLogout = createApiDef({
  url: apiPaths.postLogout,
  type: 'post',
});
