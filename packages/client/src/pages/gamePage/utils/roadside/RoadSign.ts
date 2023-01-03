// import roadSignImg1 from './assets/roadSign/roadSign1.png';
import roadSignImg2 from './assets/roadSign/roadSign2.png';
import roadSignImg3 from './assets/roadSign/roadSign3.png';
import roadSignImg4 from './assets/roadSign/roadSign4.png';
import roadSignImg5 from './assets/roadSign/roadSign5.png';
import roadSignImg6 from './assets/roadSign/roadSign6.png';
import roadSignImg7 from './assets/roadSign/roadSign7.png';
import roadSignImg8 from './assets/roadSign/roadSign8.png';
import { GameConfig } from '@/pages/gamePage/utils/game.config';
import { getRandomIntBetweenInterval } from '../helpers';

const roadSignImgArr = [
  // roadSignImg1,
  roadSignImg2,
  roadSignImg3,
  roadSignImg4,
  roadSignImg5,
  roadSignImg6,
  roadSignImg7,
  roadSignImg8,
];

/**
 * Класс дорожных знаков.
 */
export class RoadSign {
  width = 40;

  height = 100;

  x: number;

  y: number;

  isOnScreen: boolean;

  side: number;

  image = new Image();

  /**
   * Конструктор класса дорожных знаков.
   * @param {number} initialPosition - Начальная позиция.
   * @param {number} side - Сторона.
   */
  constructor(initialPosition: number, side: number) {
    this.side = side;
    const i = getRandomIntBetweenInterval(0, roadSignImgArr.length - 1);
    if (side === 1) {
      this.image.src = roadSignImgArr[i];
    }
    this.x = this.newXPosition();
    this.y = (-GameConfig.roadside.roadSignsDistance - this.height) * initialPosition;
    this.isOnScreen = true;
  }

  /**
   * Отрисовка дорожных знаков
   * @param {CanvasRenderingContext2D} context - Контекст Canvas.
   */
  draw(context: CanvasRenderingContext2D) {
    context.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  /**
   * Обновление дорожных знаков
   * @param {number} maxY - Максимально допустимое значение Y (высота Canvas)
   * @param {number} speed - Скорость смещения.
   */
  update(maxY: number, speed: number) {
    this.y += speed;
    if (this.y >= maxY) {
      this.isOnScreen = false;
      this.y = -this.height - 5000;
      this.x = this.newXPosition();
    } else this.isOnScreen = true;
  }

  /**
   * Расчет новой координаты x (смещение дерева поперёк обочины)
   * @return {number} Значение x.
   */
  newXPosition() {
    const newX = this.width;
    return 990 + newX;
  }
}
