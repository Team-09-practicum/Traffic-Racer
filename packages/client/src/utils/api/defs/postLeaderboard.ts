import { apiPaths } from '@/utils/constants';
import { createApiDef } from '../createApiDef';

export const postLeaderboard = createApiDef({
  url: apiPaths.postLeaderboard,
  type: 'post',
});
