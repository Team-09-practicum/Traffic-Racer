import { Typography } from 'antd';
import React from 'react';
import { IStatsItem } from '../../typings';
import { StatsPagePlayerInfo } from '../playerInfo/StatsPagePlayerInfo';

import './StatsPageTable.scss';

interface Props {
  scores: IStatsItem[];
}

export const StatsPageTable = (props: Props) => {
  const { scores } = props;

  return (
    <div className="stats-page__table-wrapper">
      <table className="stats-page__table">
        <thead>
          <tr>
            <th>
              <Typography.Title level={4}>#</Typography.Title>
            </th>
            <th>
              <Typography.Title level={4}>Игрок</Typography.Title>
            </th>
            <th>
              <Typography.Title level={4}>Очки</Typography.Title>
            </th>
          </tr>
        </thead>
        <tbody>
          {scores.map((scoreItem, index) => (
            <tr key={scoreItem.name}>
              <th>
                <Typography>{index + 1}</Typography>
              </th>
              <th>
                <StatsPagePlayerInfo avatarImgSrc={scoreItem.avatar} playerName={scoreItem.name} />
              </th>
              <th>
                <Typography>{scoreItem.score}</Typography>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
