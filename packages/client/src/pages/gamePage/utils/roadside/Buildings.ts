import buildingImg1 from './assets/buildings/building1.png';
import buildingImg2 from './assets/buildings/building2.png';
import buildingImg3 from './assets/buildings/building3.png';
import buildingImg4 from './assets/buildings/building4.png';
import buildingImg5 from './assets/buildings/building5.png';
import buildingImg6 from './assets/buildings/building6.png';
import buildingImg7 from './assets/buildings/building7.png';
import buildingImg8 from './assets/buildings/building8.png';
import buildingImg9 from './assets/buildings/building9.png';
import buildingImg10 from './assets/buildings/building10.png';
import { getRandomIntBetweenInterval } from '../helpers';
import { GameConfig } from '@/pages/gamePage/utils/game.config';

const buildingImgArr = [
  buildingImg1,
  buildingImg2,
  buildingImg3,
  buildingImg4,
  buildingImg5,
  buildingImg6,
  buildingImg7,
  buildingImg8,
  buildingImg9,
  buildingImg10,
];

/**
 * Класс сооружений
 */
export class Building {
  width = 150;

  height = 150;

  x: number;

  y: number;

  isOnScreen: boolean;

  side: number;

  image = new Image();

  /**
   * Конструктор класса сооружений.
   * @param {number} initialPosition - Начальная позиция.
   * @param {number} side - Сторона.
   */
  constructor(initialPosition: number, side: number) {
    this.side = side;
    const i = getRandomIntBetweenInterval(0, buildingImgArr.length - 1);
    this.image.src = buildingImgArr[i];

    this.x = this.newXPosition();
    this.y = (-GameConfig.roadside.buildingsDistance - this.height) * initialPosition;
    this.isOnScreen = true;
  }

  /**
   * Отрисовка сооружений
   * @param {CanvasRenderingContext2D} context - Контекст Canvas.
   */
  draw(context: CanvasRenderingContext2D) {
    context.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  /**
   * Обновление сооружений
   * @param {number} maxY - Максимально допустимое значение Y (высота Canvas)
   * @param {number} speed - Скорость смещения.
   */
  update(maxY: number, speed: number) {
    this.y += speed;
    if (this.y >= maxY) {
      this.isOnScreen = false;
      this.y = -this.height;
      this.x = this.newXPosition();
    } else this.isOnScreen = true;
  }

  /**
   * Расчет новой координаты x (смещение сооружений поперёк обочины)
   * @return {number} Значение x.
   */
  newXPosition() {
    const newX = Math.random() * this.width;
    return this.side === 0 ? newX : 1350 + newX;
  }
}
