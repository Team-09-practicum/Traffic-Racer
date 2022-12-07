import { apiPaths } from '@/utils/constants';
import { createApiDef } from '../createApiDef';

export const putProfileChange = createApiDef({
  url: apiPaths.putProfile,
  type: 'put',
});
