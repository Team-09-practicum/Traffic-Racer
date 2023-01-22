import { apiPaths } from '@/utils/constants';
import { createApiDef } from '../createApiDef';

export const postSignInOAuth = createApiDef({
  url: apiPaths.signInURI,
  type: 'post',
});
