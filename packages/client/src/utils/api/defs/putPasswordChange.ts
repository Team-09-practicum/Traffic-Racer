import { apiPaths } from '@/utils/constants';
import { createApiDef } from '../createApiDef';

export const putPasswordChange = createApiDef({
  url: apiPaths.putPassword,
  type: 'put',
});
