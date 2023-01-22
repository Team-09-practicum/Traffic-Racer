import { apiPaths } from '@/utils/constants';
import { createApiDef } from '../createApiDef';

export const getOAuthServiceId = createApiDef({
  url: apiPaths.getServiceIdURI,
  type: 'get',
});
