import objectImg1 from './assets/objects/object1.png';
import objectImg2 from './assets/objects/object2.png';
import objectImg3 from './assets/objects/object3.png';
import objectImg4 from './assets/objects/object4.png';
import objectImg5 from './assets/objects/object5.png';
import objectImg6 from './assets/objects/object6.png';
import objectImg7 from './assets/objects/object7.png';
import objectImg8 from './assets/objects/object8.png';
import objectImg9 from './assets/objects/object9.png';
import objectImg10 from './assets/objects/object10.png';
import { getRandomIntBetweenInterval } from '../helpers';
import { GameConfig } from '@/pages/gamePage/utils/game.config';

const objectsImgArr = [
  objectImg1,
  objectImg2,
  objectImg3,
  objectImg4,
  objectImg5,
  objectImg6,
  objectImg7,
  objectImg8,
  objectImg9,
  objectImg10,
];

/**
 * Класс дорожных объектов
 */
export class RoadObject {
  maxWidth = 300;

  maxHeight = 300;

  width!: number;

  height!: number;

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
    const i = getRandomIntBetweenInterval(0, objectsImgArr.length - 1);
    this.image.src = objectsImgArr[i];

    if (this.image.width > this.maxWidth) {
      this.width = this.maxWidth;
    } else {
      this.width = this.image.width;
    }
    if (this.image.height > this.maxHeight) {
      this.height = this.maxHeight;
    } else {
      this.height = this.image.height;
    }
    this.x = this.newXPosition();
    this.y = (-GameConfig.roadside.objectsDistance + this.height) * initialPosition;
    this.isOnScreen = true;
  }

  /**
   * Отрисовка дорожных объектов
   * @param {CanvasRenderingContext2D} context - Контекст Canvas.
   */
  draw(context: CanvasRenderingContext2D) {
    context.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  /**
   * Обновление дорожных объектов
   * @param {number} maxY - Максимально допустимое значение Y (высота Canvas)
   * @param {number} speed - Скорость смещения.
   */
  update(maxY: number, speed: number) {
    this.y += speed;
    if (this.y >= maxY) {
      this.isOnScreen = false;
      this.y = -this.maxHeight - 3000;
      this.x = this.newXPosition();
    } else this.isOnScreen = true;
  }

  /**
   * Расчет новой координаты x (смещение сооружений поперёк обочины)
   * @return {number} Значение x.
   */
  newXPosition() {
    const newX = Math.random() * this.maxWidth;
    return this.side === 0 ? newX - 50 : 1250 + newX;
  }
}
