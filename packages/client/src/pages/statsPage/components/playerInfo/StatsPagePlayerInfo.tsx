import React from 'react';
import { Typography } from 'antd';
import { getAvatarBackgroundColor, getFirstLetterFromName } from '../../utils';
import { apiPaths } from '@/utils/constants';
import './StatsPagePlayerInfo.scss';

interface Props {
  avatarImgSrc?: string | null;
  playerName: string;
}

export const StatsPagePlayerInfo = ({ avatarImgSrc, playerName }: Props) => {
  const avatarPath = `${apiPaths.showAvatar}/${avatarImgSrc}`;

  return (
    <div className="stats-page__player-info">
      <div className="stats-page__player-avatar-wrapper">
        {avatarImgSrc ? (
          <img src={avatarPath} className="stats-page__player-avatar" alt="avatar" />
        ) : (
          <div className="stats-page__player-avatar-background" style={{ backgroundColor: getAvatarBackgroundColor() }}>
            <Typography className="stats-page__player-avatar-letter">{getFirstLetterFromName(playerName)}</Typography>
          </div>
        )}
      </div>

      <span className="stats-page__player-name">
        <Typography>{playerName}</Typography>
      </span>
    </div>
  );
};
