import { GameConfig } from '@/pages/gamePage/utils/game.config';
import { getRandomIntBetweenInterval } from './helpers';
import { CollisionArea } from './Car';
import puddleImg1 from '../assets/obstacle/puddle1.png';
import puddleImg2 from '../assets/obstacle/puddle2.png';
import puddleImg3 from '../assets/obstacle/puddle3.png';

const puddleImgArr = [puddleImg1, puddleImg2, puddleImg3];

/**
 * Класс препятствий
 */

export class Obstacle {
  width = 80;

  height = 70;

  x: number;

  y: number;

  isOnRoad: boolean;

  lane!: number;

  type: number;

  collisionArea: CollisionArea;

  image = new Image();

  showCollisionArea = false;

  /**
   * Конструктор класса препятствий.
   * @param {number} emptyLane - Расположение.
   * @param {number} type - Вид препятсвия.
   */
  constructor(emptyLane: number, type: number) {
    this.type = type;
    const i = getRandomIntBetweenInterval(0, puddleImgArr.length - 1);
    if (this.type === GameConfig.obstacle.oil) {
      this.image.src = 'src/pages/gamePage/assets/obstacle/oil.png';
    } else {
      this.image.src = puddleImgArr[i];
    }

    this.x = this.newXPosition(emptyLane);
    this.y = -this.height;
    this.isOnRoad = true;

    this.collisionArea = {
      x: this.x,
      y: this.y,
      height: this.height - 60,
      width: this.width,
    };
  }

  /**
   * Отрисовка препятсвия
   * @param {CanvasRenderingContext2D} context - Контекст Canvas.
   */
  draw(context: CanvasRenderingContext2D) {
    context.drawImage(this.image, this.x, this.y, this.width, this.height);
    if (this.showCollisionArea) {
      context.strokeRect(
        this.collisionArea.x,
        this.collisionArea.y,
        this.collisionArea.width,
        this.collisionArea.height
      );
    }
  }

  /**
   * Обновление препятсвия
   * @param {number} maxY - Максимально допустимое значение Y (высота Canvas)
   */

  update(maxY: number, speed: number) {
    this.y += speed;
    if (this.y >= maxY) {
      this.isOnRoad = false;
    } else {
      this.isOnRoad = true;
    }
    this.collisionArea.x = this.x;
    this.collisionArea.y = this.y;
  }

  /**
   * Расчет  координаты x (новое расположение на дороге)
   * @return {number} Значение x.
   */
  newXPosition(emptyLane: number): number {
    let newRandom = getRandomIntBetweenInterval(0, GameConfig.scenario.numberOfLanes - 1);
    while (newRandom === emptyLane) {
      newRandom = getRandomIntBetweenInterval(0, GameConfig.scenario.numberOfLanes - 1);
    }
    this.lane = newRandom;
    return 180 + GameConfig.scenario.lanesSize * newRandom;
  }
}
