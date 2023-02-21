import { apiPaths } from '@/utils/constants';
import { createApiDef } from '../createApiDef';

export const postSignIn = createApiDef({
  url: apiPaths.postSignIn,
  type: 'post',
});
