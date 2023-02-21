import React from 'react';
import { Typography } from 'antd';
import { ILeaderboardItem } from '../../typings';
import { StatsPagePlayerInfo } from '../playerInfo/StatsPagePlayerInfo';
import './StatsPageTable.scss';

interface Props {
  scores: ILeaderboardItem[];
}

export const StatsPageTable = ({ scores }: Props) => (
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
        {scores.map(({ data }, index) => (
          <tr key={data.id}>
            <th>
              <Typography>{index + 1}</Typography>
            </th>
            <th>
              <StatsPagePlayerInfo avatarImgSrc={data.avatar} playerName={data.username} />
            </th>
            <th>
              <Typography>{data.score}</Typography>
            </th>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
