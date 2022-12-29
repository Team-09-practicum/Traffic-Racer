/**
 * Не забыть указать авторство
 * <a href="https://ru.freepik.com/free-vector/_13683715.htm#query=top%20down%20tree&position=0&from_view=search&track=sph">Изображение от pch.vector</a> на Freepik
 */
import treeImg1 from './assets/tree/tree1.png';
import treeImg2 from './assets/tree/tree2.png';
import treeImg3 from './assets/tree/tree3.png';
import treeImg4 from './assets/tree/tree4.png';
import treeImg5 from './assets/tree/tree5.png';
import treeImg6 from './assets/tree/tree6.png';

import { getRandomIntBetweenInterval } from '../helpers';
import { GameConfig } from '@/pages/gamePage/utils/game.config';

const treeImgArr = [treeImg1, treeImg2, treeImg3, treeImg4, treeImg5, treeImg6];

/**
 * Класс дерева
 */
export class Tree {
  width = 80;

  height = 80;

  x: number;

  y: number;

  isOnScreen: boolean;

  side: number;

  image = new Image();

  /**
   * Конструктор класса дерева.
   * @param {number} initialPosition - Начальная позиция.
   * @param {number} side - Сторона.
   */
  constructor(initialPosition: number, side: number) {
    this.side = side;
    const i = getRandomIntBetweenInterval(0, treeImgArr.length - 1);
    this.image.src = treeImgArr[i];

    this.x = this.newXPosition();
    this.y = (-GameConfig.roadside.treeDistance - this.height) * initialPosition;
    this.isOnScreen = true;
  }

  /**
   * Отрисовка дерева
   * @param {CanvasRenderingContext2D} context - Контекст Canvas.
   */
  draw(context: CanvasRenderingContext2D) {
    context.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  /**
   * Обновление дерева
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
   * Расчет новой координаты x (смещение дерева поперёк обочины)
   * @return {number} Значение x.
   */
  newXPosition() {
    const newX = Math.random() * this.width;
    return this.side === 0 ? 400 + newX : 1050 + newX;
  }
}
