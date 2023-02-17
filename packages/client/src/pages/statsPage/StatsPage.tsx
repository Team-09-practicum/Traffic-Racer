import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Typography } from 'antd';
import { appRoutes } from '@/utils/router/appRoutes';
import { getLeaderboard } from '@/controllers/getLeaderboard';
import { StatsPageTable } from './components/table/StatsPageTable';
import { ILeaderboardItem } from './typings';
import { useAppSelector } from '@/utils/store/store';
import { getIsAuth } from '@/utils/store/selectors/getIsAuthSelector/getIsAuthSelector';
import './StatsPage.scss';

export const StatsPage = () => {
  const [leaderboard, setLeaderboard] = useState<ILeaderboardItem[] | null>(null);
  const isAuth = useAppSelector(getIsAuth);

  useEffect(() => {
    if (isAuth) {
      const fetchLeaderboard = async () => {
        const leaderboardData = await getLeaderboard();
        setLeaderboard(leaderboardData.filter((item) => item.data.id));
      };
      fetchLeaderboard();
    }
  }, [isAuth]);

  return (
    <>
      <Typography.Title level={1} className="stats-page__title">
        Топ самых-самых
      </Typography.Title>
      {leaderboard ? (
        <StatsPageTable scores={leaderboard} />
      ) : (
        <div className="stats-page__empty">
          {isAuth ? (
            <>
              <Typography>Пока еще никто не успел занять тут место...</Typography>
              <Typography>
                ...можешь <Link to={appRoutes.game}>сыграть</Link> сейчас и стать первым!
              </Typography>
            </>
          ) : (
            <Typography>
              Нужно <Link to={appRoutes.auth}>войти</Link> чтобы посмотреть лидерборд
            </Typography>
          )}
        </div>
      )}
    </>
  );
};
