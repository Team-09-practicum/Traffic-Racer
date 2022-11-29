/* eslint-disable no-unused-vars */
import { GameConfig } from './game.config';
import { CollisionArea } from './Car';

type CheckIsCollide = (obj1: CollisionArea, obj2: CollisionArea) => boolean;
type CheckIsCloseTo = (obj1: CollisionArea, obj2: CollisionArea, nearDistanceY: number) => boolean;

export const isCloseToY: CheckIsCloseTo = (obj1, obj2, nearDistanceY) => {
  let distance = nearDistanceY;
  if (distance < 0) distance = 0;
  if (obj1.y <= obj2.y && obj1.y + obj1.height + distance >= obj2.y) return true;
  return obj2.y <= obj1.y && obj2.y + obj2.height + distance >= obj1.y;
};

export const isCloseToX: CheckIsCloseTo = (obj1, obj2, nearDistanceX) => {
  let distance = nearDistanceX;
  if (distance < 0) distance = 0;
  if (obj1.x <= obj2.x && obj1.x + obj1.width + distance >= obj2.x) return true;
  return obj2.x <= obj1.x && obj2.x + obj2.width + distance >= obj1.x;
};

export const isCollideX: CheckIsCollide = (obj1, obj2) => isCloseToX(obj1, obj2, -1);

export const isCollideY: CheckIsCollide = (obj1, obj2) => isCloseToY(obj1, obj2, -1);

export const isCollide: CheckIsCollide = (obj1, obj2) => isCollideY(obj1, obj2) && isCollideX(obj1, obj2);

export const isCloseTo: CheckIsCollide = (obj1, obj2) =>
  isCloseToY(obj1, obj2, GameConfig.collision.nearDistanceY) &&
  isCloseToX(obj1, obj2, GameConfig.collision.nearDistanceX);

export function getRandomIntBetweenInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
