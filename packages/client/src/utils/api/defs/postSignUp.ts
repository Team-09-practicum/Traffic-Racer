import { apiPaths } from '@/utils/constants';
import { createApiDef } from '../createApiDef';

export const postSignUp = createApiDef({
  url: apiPaths.postSignUp,
  type: 'post',
});
