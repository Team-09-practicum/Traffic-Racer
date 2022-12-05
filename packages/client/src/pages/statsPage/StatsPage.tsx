import { Link } from 'react-router-dom';
import React from 'react';
import { Typography } from 'antd';
import { appRoutes } from '@/utils/router/appRoutes';
import { StatsPageTable } from './__table/stats-page__table';
import { response } from './mocks';

import './stats-page.scss';

export const StatsPage = () => (
  <>
    <Link to={appRoutes.main}> Главное меню </Link>
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
