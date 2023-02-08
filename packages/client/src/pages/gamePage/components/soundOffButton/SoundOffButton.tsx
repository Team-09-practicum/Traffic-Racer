import React from 'react';
import { SoundOutlined, SoundFilled } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@/utils/store/store';
import { appStatusActions } from '@/utils/store/reducers/appStatusSlice/appStatusSlice';
import { getIsSoundOn } from '@/utils/store/selectors/getAppStatusSelectors/getAppStatusSelectors';
import './SoundOffButton.scss';

export const SoundOffButton = () => {
  const soundOn = useAppSelector(getIsSoundOn);
  const dispatch = useAppDispatch();
  const toggle = () => {
    dispatch(appStatusActions.setIsSoundOn(!soundOn));
  };
  const SoundIcon = soundOn ? SoundFilled : SoundOutlined;

  return (
    <div>
      <SoundIcon className="sound-off-button" onClick={toggle} />
    </div>
  );
};
