import { Link } from 'react-router-dom';
import React from 'react';
import { Typography } from 'antd';
import { appRoutes } from '@/utils/router/appRoutes';
import { StatsPageTable } from './components/table/StatsPageTable';
import { response } from './mocks';

import './StatsPage.scss';

export const StatsPage = () => (
  <>
    <Typography.Title level={1} className="stats-page__title">
      Топ самых-самых
    </Typography.Title>
    {response ? (
      <StatsPageTable scores={response} />
    ) : (
      <div className="stats-page__empty">
        <Typography>Пока еще никто не успел занять тут место...</Typography>
        <Typography>
          ...можешь <Link to={appRoutes.game}>сыграть</Link> сейчас и стать первым!
        </Typography>
      </div>
    )}
  </>
);
