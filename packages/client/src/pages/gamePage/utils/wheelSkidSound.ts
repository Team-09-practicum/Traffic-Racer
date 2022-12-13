import path1 from '../assets/sounds/wheelSkid/skid1.mp3';
import path2 from '../assets/sounds/wheelSkid/skid2.mp3';
import path3 from '../assets/sounds/wheelSkid/skid3.mp3';
import path4 from '../assets/sounds/wheelSkid/skid4.mp3';

import { getRandomArrIndex } from './helpers';

export function wheelSkidSound() {
  const soundArr = [path1, path2, path3, path4];
  const soundIndex = getRandomArrIndex(soundArr.length);
  const skidSound = new Audio(soundArr[soundIndex]);
  return skidSound;
}
