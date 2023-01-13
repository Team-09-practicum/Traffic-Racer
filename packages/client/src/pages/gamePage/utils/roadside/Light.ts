import lightLeft from './assets/light/lightLeft.png';
import lightRight from './assets/light/ligthRight.png';
import { GameConfig } from '@/pages/gamePage/utils/game.config';

/**
 * Класс освещения
 */
export class Light {
  width = 150;

  height = 190;

  x: number;

  y: number;

  isOnScreen: boolean;

  side: number;

  image = new Image();

  /**
   * Конструктор класса освещения.
   * @param {number} initialPosition - Начальная позиция.
   * @param {number} side - Сторона.
   */
  constructor(initialPosition: number, side: number) {
    this.side = side;
    if (side === 0) {
      this.image.src = lightLeft;
    } else {
      this.image.src = lightRight;
    }

    this.x = this.newXPosition();
    this.y = (-GameConfig.roadside.lightDistance - this.height) * initialPosition;
    this.isOnScreen = true;
  }

  /**
   * Отрисовка освещения
   * @param {CanvasRenderingContext2D} context - Контекст Canvas.
   */
  draw(context: CanvasRenderingContext2D) {
    context.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  /**
   * Обновление освещения
   * @param {number} maxY - Максимально допустимое значение Y (высота Canvas)
   * @param {number} speed - Скорость смещения.
   */
  update(maxY: number, speed: number) {
    this.y += speed;
    if (this.y >= maxY) {
      this.isOnScreen = false;
      this.y = -this.height - 400;
      this.x = this.newXPosition();
    } else this.isOnScreen = true;
  }

  /**
   * Расчет новой координаты x (смещение дерева поперёк обочины)
   * @return {number} Значение x.
   */
  newXPosition() {
    const newX = this.width;
    return this.side === 0 ? 430 + newX : 920 + newX;
  }
}
