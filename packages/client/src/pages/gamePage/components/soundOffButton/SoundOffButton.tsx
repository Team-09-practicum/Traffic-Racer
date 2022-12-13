import React from 'react';
import { SoundOutlined, SoundFilled } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { appStatusActions } from '@/utils/store/reducers/appStatusSlice/appStatusSlice';
import { getIsSoundOn } from '@/utils/store/selectors/getAppStatusSelectors/getAppStatusSelectors';
import './SoundOffButton.scss';

export const SoundOffButton = () => {
  const soundOn = useSelector(getIsSoundOn);
  const dispatch = useDispatch();
  const toggle = () => {
    dispatch(appStatusActions.setIsSoundOn(!soundOn));
  };

  return (
    <div>
      {soundOn ? (
        <SoundFilled className="sound-off-button" onClick={toggle} />
      ) : (
        <SoundOutlined className="sound-off-button" onClick={toggle} />
      )}
    </div>
  );
};
