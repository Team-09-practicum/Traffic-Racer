import { GameConfig } from '@/pages/gamePage/utils/game.config';

/**
 * Дорожный знак, обозначающий окончание города
 */
export class CityLimitSign {
  width = 80;

  height = 20;

  x: number;

  y: number;

  padding = 5;

  isOnScreen: boolean;

  /**
   * Конструктор класса.
   * @param {number} initialPosition - Начальная позиция.
   */
  constructor(initialPosition: number) {
    this.x = 1160;
    this.y = initialPosition + 120;
    this.isOnScreen = true;
  }

  /**
   * Отрисовка знака
   * @param {CanvasRenderingContext2D} context - Контекст Canvas.
   */
  draw(context: CanvasRenderingContext2D) {
    const { city } = GameConfig.player;

    context.save();
    context.font = '16px Arial';
    context.textBaseline = 'top';
    this.width = Math.floor(context.measureText(city).width);

    context.fillStyle = 'white';
    context.strokeStyle = 'black';
    context.beginPath();
    context.roundRect(
      this.x - this.padding,
      this.y - this.padding,
      this.width + this.padding * 2,
      this.height + this.padding * 2,
      5
    );
    context.stroke();
    context.fill();
    context.closePath();

    context.fillStyle = 'black';
    context.fillText(city, this.x, this.y);

    context.strokeStyle = 'rgba(255, 0, 0, 0.7)';
    context.lineWidth = 4;
    context.beginPath();
    context.moveTo(this.x + this.width / 4, this.y + this.height + this.padding);
    context.lineTo(this.x + this.width - this.width / 4, this.y - this.padding);
    context.stroke();
    context.closePath();

    context.restore();
  }

  /**
   * Обновление дорожного знака
   * @param {number} maxY - Максимально допустимое значение Y (высота Canvas)
   * @param {number} speed - Скорость смещения.
   */
  update(maxY: number, speed: number) {
    this.y += speed;
    this.isOnScreen = this.y < maxY;
  }
}
