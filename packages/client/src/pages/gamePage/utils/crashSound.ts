import path1 from '../assets/sounds/crash/crash1.mp3';
import path2 from '../assets/sounds/crash/crash2.mp3';
import path3 from '../assets/sounds/crash/crash3.mp3';
import { getRandomArrIndex } from './helpers';

export function crashSound() {
  const soundArr = [path1, path2, path3];
  const soundIndex = getRandomArrIndex(soundArr.length);
  const sound = new Audio(soundArr[soundIndex]);
  return sound;
}
