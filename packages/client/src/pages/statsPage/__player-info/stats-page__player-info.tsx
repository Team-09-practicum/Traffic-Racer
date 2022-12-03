import { Typography } from 'antd';
import React from 'react';
import { getAvatarBackgroundColor, getFirstLetterFromName } from '../utils';

import './stats-page__player-info.scss';

interface Props {
  avatarImgSrc?: string | null;
  playerName: string;
}

export const StatsPagePlayerInfo = (props: Props) => {
  const { avatarImgSrc, playerName } = props;

  return (
    <div className="stats-page__player-info">
      <div className="stats-page__player-avatar-wrapper">
        {avatarImgSrc ? (
          <img src={avatarImgSrc} className="stats-page__player-avatar" alt="avatar" />
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
