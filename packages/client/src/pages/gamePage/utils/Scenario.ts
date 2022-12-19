import roadImg from '../assets/scenario/road.png';
import { Tree } from './roadside/Tree';
import { GameConfig } from './game.config';

/**
 * Класс определяющий сценарий игры
 */
export class Scenario {
  roadImage = new Image();

  roadImageWidth = 500;

  roadImageHeight = 500;

  canvas!: HTMLCanvasElement;

  context!: CanvasRenderingContext2D;

  x!: number;

  y!: number;

  y2!: number;

  trees: Tree[] = [];

  /**
   * Конструктор класса сценария.
   * @param {HTMLCanvasElement} canvas - Элемент Canvas.
   */
  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.canvas.style.backgroundColor = 'green';
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.context = canvas.getContext('2d')!;

    this.roadImage.onload = () => {
      this.roadImageHeight = Math.max(this.canvas.height, this.roadImage.naturalHeight);

      this.x = canvas.width / 2 - this.roadImageWidth / 2;
      this.y = 0;
      this.y2 = -this.roadImageHeight;
    };
    this.roadImage.src = roadImg;

    this.createTrees();
  }

  /**
   * Отрисовка дороги (в т.ч. обочины)
   */
  drawRoad() {
    this.context.drawImage(this.roadImage, this.x, this.y, this.roadImageWidth, this.roadImageHeight);
    this.context.drawImage(this.roadImage, this.x, this.y2, this.roadImageWidth, this.roadImageHeight);

    this.trees.forEach((tree) => {
      tree.draw(this.context);
    });
  }

  /**
   * Обновление дороги (в т.ч. обочины)
   * @param {number} speed - Скорость смещения.
   */
  updateRoad(speed: number) {
    this.y += speed;
    if (this.y >= this.roadImageHeight) this.y = 0;

    this.y2 += speed;
    if (this.y2 >= 0) this.y2 = -this.roadImageHeight;

    this.updateTrees(speed);
  }

  /**
   * Обновление высоты дороги
   * @param {number} height - Высота в пикселях.
   */
  setRoadImageHeight(height: number) {
    this.roadImageHeight = height;
    this.y = 0;
    this.y2 = -height;
  }

  /**
   * Создание деревьев
   */
  createTrees() {
    const sideBreakPoint = Math.floor((GameConfig.roadside.trees - 1) / 2);
    let treePositionIndex = 0;
    let treeSide = 0;

    for (let i = 0; i < GameConfig.roadside.trees; i++) {
      this.trees[i] = new Tree(treePositionIndex, treeSide);

      if (treePositionIndex >= sideBreakPoint) {
        treePositionIndex = 0;
        treeSide = 1;
      } else treePositionIndex++;
    }
  }

  /**
   * Обновление деревьев
   * @param {number} speed - Скорость смещения.
   */
  updateTrees(speed: number) {
    this.trees.forEach((tree) => {
      tree.update(this.canvas.height, speed);
    });
  }
}
