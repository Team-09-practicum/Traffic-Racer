import { apiPaths } from '@/utils/constants';
import { createApiDef } from '../createApiDef';

export const putAvatarChange = createApiDef({
  url: apiPaths.putAvatar,
  type: 'put',
});
