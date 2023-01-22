import { api } from '@/utils/api';
import { showNetworkError } from '@/utils/showNetworkError';

export interface ILeaderboardData {
  id: number;
  username: string;
  avatar: string | null;
  score: number;
}

export const updateLeaderboard = async (leaderboardData: ILeaderboardData): Promise<void> => {
  await api.postLeaderboard({
    data: {
      data: leaderboardData,
      ratingFieldName: 'score',
      teamName: 'Team09',
    },
    onError: (err) => showNetworkError(err.response.data.reason),
  });
};
