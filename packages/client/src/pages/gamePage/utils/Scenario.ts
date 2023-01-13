import roadImg from '../assets/scenario/road.png';
import { Tree, CityLimitSign } from './roadside';
import { GameConfig } from './game.config';
import { Obstacle } from './Obstacle';
import { Light } from './roadside/Light';
import { RoadObject } from './roadside/RoadObject';

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

  lights: Light[] = [];

  roadObjects: RoadObject[] = [];

  puddle!: Obstacle;

  oil!: Obstacle;

  cityLimitSign?: CityLimitSign;

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
    this.createLights();
    this.createRoadObjects();
    this.createCityLimitSign();
  }

  /**
   * Отрисовка дороги (в т.ч. обочины)
   */
  drawRoad() {
    this.context.drawImage(this.roadImage, this.x, this.y, this.roadImageWidth, this.roadImageHeight);
    this.context.drawImage(this.roadImage, this.x, this.y2, this.roadImageWidth, this.roadImageHeight);

    if (this.isThereOil()) {
      this.oil.draw(this.context);
    }

    if (this.isTherePuddle()) {
      this.puddle.draw(this.context);
    }

    this.trees.forEach((tree) => {
      tree.draw(this.context);
    });

    this.lights.forEach((light) => {
      light.draw(this.context);
    });

    this.roadObjects.forEach((roadObject) => {
      roadObject.draw(this.context);
    });
    if (this.isThereCityLimitSign()) {
      this.cityLimitSign?.draw(this.context);
    }
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

    if (this.hasObstaclesOnRoad()) {
      this.updateObstacles(speed);
    } else {
      this.tryPutAnObstacleOnRoad(speed);
    }

    this.updateTrees(speed);
    this.updateLights(speed);
    this.updateRoadObjects(speed);

    if (this.isThereCityLimitSign()) {
      this.cityLimitSign?.update(this.canvas.height, speed);
    }
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
   * Создание освещения
   */
  createLights() {
    const sideBreakPoint = Math.floor((GameConfig.roadside.lights - 1) / 2);
    let lightPositionIndex = 0;
    let lightSide = 0;

    for (let i = 0; i < GameConfig.roadside.lights; i++) {
      this.lights[i] = new Light(lightPositionIndex, lightSide);

      if (lightPositionIndex >= sideBreakPoint) {
        lightPositionIndex = 0;
        lightSide = 1;
      } else lightPositionIndex++;
    }
  }

  /**
   * Создание дорожных объектов
   */
  createRoadObjects() {
    const sideBreakPoint = Math.floor((GameConfig.roadside.objects - 1) / 2);
    let roadObjectPositionIndex = 0;
    let roadObjectSide = 0;

    for (let i = 0; i < GameConfig.roadside.objects; i++) {
      this.roadObjects[i] = new RoadObject(roadObjectPositionIndex, roadObjectSide);

      if (roadObjectPositionIndex >= sideBreakPoint) {
        roadObjectPositionIndex = 0;
        roadObjectSide = 1;
      } else roadObjectPositionIndex++;
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

  /**
   * Обновление освещения
   * @param {number} speed - Скорость смещения.
   */

  updateLights(speed: number) {
    this.lights.forEach((light) => {
      light.update(this.canvas.height, speed);
    });
  }

  /**
   * Обновление дорожных объектов
   * @param {number} speed - Скорость смещения.
   */

  updateRoadObjects(speed: number) {
    this.roadObjects.forEach((roadObject) => {
      roadObject.update(this.canvas.height, speed);
    });
  }

  /**
   * Обновление препятствий
   * @param {number} speed - Скорость смещения.
   */
  updateObstacles(speed: number) {
    if (this.isThereOil()) {
      this.oil.update(this.canvas.height, speed);
    }

    if (this.isTherePuddle()) {
      this.puddle.update(this.canvas.height, speed);
    }
  }

  /**
   * Пытается установить препятствие в свободную полосу
   * @param {number} emptyLane - свободная полоса.
   */
  tryPutAnObstacleOnRoad(emptyLane: number) {
    const newObstacleProbability = Math.random();

    if (newObstacleProbability < 0.02) {
      this.putAnObstacleOnRoad(emptyLane);
    }
  }

  /**
   *  Устанавливает препятствие в свободную полосу
   * @param {number} emptyLane - свободная полоса.
   */
  putAnObstacleOnRoad(emptyLane: number) {
    const typeObstacleProbability = Math.random();

    if (typeObstacleProbability < 0.7) {
      this.createPuddle(emptyLane);
    } else {
      this.createOil(emptyLane);
    }
  }

  /**
   * Создание лужи
   */
  createPuddle(emptyLane: number) {
    if (!this.puddle || !this.puddle.isOnRoad) {
      this.puddle = new Obstacle(emptyLane, 'puddle');
    }
  }

  /**
   * Создание масляной лужи
   */
  createOil(emptyLane: number) {
    if (!this.oil || !this.oil.isOnRoad) {
      this.oil = new Obstacle(emptyLane, 'oil');
    }
  }

  /**
   * Проверка, что препятстиве есть на дороге
   * @return {boolean} .
   */
  hasObstaclesOnRoad(): boolean {
    return this.isThereOil() || this.isTherePuddle();
  }

  isThereOil() {
    return this.oil && this.oil.isOnRoad;
  }

  isTherePuddle() {
    return this.puddle && this.puddle.isOnRoad;
  }

  /**
   * Создание дорожного знака с наименованием города игрока
   */
  createCityLimitSign() {
    if (!GameConfig.player.city) return;
    this.cityLimitSign = new CityLimitSign(100);
  }

  /**
   * Проверка, что дорожный знаа с наименованием города есть на дороге
   * @return {boolean} .
   */
  isThereCityLimitSign() {
    return this.cityLimitSign && this.cityLimitSign.isOnScreen;
  }
}
