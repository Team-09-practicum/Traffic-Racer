import { apiPaths } from '@/utils/constants';
import { createApiDef } from '../createApiDef';

export const postTeamLeaderboard = createApiDef({
  url: apiPaths.postTeamLeaderboard,
  type: 'post',
});
