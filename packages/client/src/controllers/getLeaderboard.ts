import { api } from '@/utils/api';
import { ILeaderboardItem } from '@/pages/statsPage/typings';
import { showNetworkError } from '@/utils/showNetworkError';

export const getLeaderboard = async (): Promise<ILeaderboardItem[]> => {
  const leaderboard = await api.postTeamLeaderboard({
    data: {
      ratingFieldName: 'score',
      cursor: 0,
      limit: 100,
    },
    onError: (err) => showNetworkError(err.response.data.reason),
  });
  return leaderboard as ILeaderboardItem[];
};
