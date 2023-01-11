import path1 from '../assets/sounds/puddle/puddle1.mp3';
import path2 from '../assets/sounds/puddle/puddle2.mp3';
import { getRandomArrIndex } from './helpers';

export function puddleSound() {
  const soundArr = [path1, path2];
  const soundIndex = getRandomArrIndex(soundArr.length);
  const sound = new Audio(soundArr[soundIndex]);
  return sound;
}
