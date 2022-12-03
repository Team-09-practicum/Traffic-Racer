import { MutableRefObject } from 'react';
import { getRandomIntBetweenInterval, isCollide, isCloseTo } from './helpers';
import { GameConfig } from './game.config';
import { Car } from './Car';

/**
 * Класс управляющий трафиком
 */
export class Traffic {
  canvas!: HTMLCanvasElement;

  context!: CanvasRenderingContext2D;

  initialCarsYPosition = -100;

  cars: (Car | undefined)[] = [];

  necessaryRoadSpace = GameConfig.collision.nearDistanceX + GameConfig.collision.nearDistanceY;

  carPlayer: Car | null = null;

  emptyLane: number;

  nextEmptyLane: number;

  gameOverRef: MutableRefObject<boolean>;

  /**
   * Конструктор класса сценария.
   * @param {HTMLCanvasElement} canvas - Элемент Canvas.
   * @param {Car | null} carPlayer - Класс Car игрока.
   * @param {MutableRefObject} gameOverRef - Ref для передачи состояния завершения игры.
   */
  constructor(canvas: HTMLCanvasElement, carPlayer: Car | null, gameOverRef: MutableRefObject<boolean>) {
    this.canvas = canvas;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.context = canvas.getContext('2d')!;
    this.gameOverRef = gameOverRef;
    this.carPlayer = carPlayer;
    this.nextEmptyLane = getRandomIntBetweenInterval(0, GameConfig.scenario.numberOfLanes - 1);
    this.emptyLane = this.nextEmptyLane;
    this.createCars();
  }

  /**
   * Создание автомобилей
   */
  createCars() {
    for (let i = 0; i < GameConfig.traffic.cars; i++) {
      this.cars[i] = this.tryCreateCar();
    }
  }

  /**
   * Пробует создать автомобиль в текущей полосе
   * @returns {Car | undefined} Класс Car или undefined.
   */
  tryCreateCar() {
    let currentLane = getRandomIntBetweenInterval(0, GameConfig.scenario.numberOfLanes - 1);
    while (currentLane === this.emptyLane || currentLane === this.nextEmptyLane) {
      currentLane = getRandomIntBetweenInterval(0, GameConfig.scenario.numberOfLanes - 1);
    }

    if (this.canCreateCarInLane(currentLane)) {
      return this.createCar(currentLane);
    }
    return undefined;
  }

  /**
   * Проверка возможности создать автомобиль в указанной полосе
   * @param {number} laneNum - Индекс полосы.
   * @returns {boolean}
   */
  canCreateCarInLane(laneNum: number) {
    const carsInCurrentLane = this.carsInLane(laneNum);
    return !carsInCurrentLane.some((car) => car.y < this.necessaryRoadSpace);
  }

  /**
   * Получение списка автомобилей в указанной полосе
   * @param {number} laneNum - Индекс полосы.
   * @returns {Car[]} Массив автомобилей
   */
  carsInLane(laneNum: number) {
    return this.cars.filter((car): car is Car => !!car && car.getCurrentLane() === laneNum);
  }

  /**
   * Создание автомобиля
   * @param {number} laneNum - Индекс полосы.
   * @returns {Car} Автомобиль
   */
  createCar(laneNum: number) {
    const carTypesLen = Car.getCarTypesLength() - 1;
    const carTypeIndex = getRandomIntBetweenInterval(0, carTypesLen);
    const c = new Car(this.initialCarsYPosition, carTypeIndex);

    c.setCurrentLane(laneNum);
    c.setCarSpeed(Math.random());

    const carsInLaneTemp = this.carsInLane(laneNum);
    let maxSpeed = 0;

    carsInLaneTemp.forEach((car) => {
      if (car) {
        const carSpeed = car.getCarSpeed();
        if (carSpeed > maxSpeed) maxSpeed = carSpeed;
      }
    });

    while (c.getCarSpeed() < maxSpeed - 0.1) {
      c.setCarSpeed(Math.random());
    }

    return c;
  }

  /**
   * Отрисовка трафика
   */
  draw() {
    this.cars.forEach((car) => {
      if (car) car.drawCar(this.context);
    });
  }

  /**
   * Обновление трафика
   * @param {number} speed - Скорость смещения.
   */
  update(speed: number) {
    for (let i = 0; i < this.cars.length; i++) {
      const currentCar = this.cars[i];
      if (currentCar) {
        currentCar.checkCollision();
        const newPosition = currentCar.getY() + speed * currentCar.carSpeed;
        currentCar.setY(newPosition);

        if (currentCar.getY() > this.canvas.height) {
          this.cars[i] = undefined;
        }
      } else {
        this.cars[i] = this.tryCreateCar();
      }
    }

    // Проверка столкновений в полосах
    for (let i = 0; i < GameConfig.scenario.numberOfLanes; i++) {
      const carsInCurrentLane = this.carsInLane(i);
      this.preventCollisionInLane(carsInCurrentLane);
    }

    if (this.carPlayer) this.verifyPlayerCollision();

    this.changeEmptyLane();
    this.tryChangeEmptyLane();
  }

  /**
   * Проверка столкновений в полосе
   * @param {Car[]} carsInCurrentLane - Автомобили в полосе.
   */
  // eslint-disable-next-line class-methods-use-this
  preventCollisionInLane(carsInCurrentLane: Car[]) {
    if (!carsInCurrentLane.length) return;
    for (let i = 0; i < carsInCurrentLane.length; i++) {
      const car = carsInCurrentLane[i];
      car.carNearMyBack = undefined;
    }

    for (let i = 0; i < carsInCurrentLane.length; i++) {
      const car1 = carsInCurrentLane[i];
      for (let j = i + 1; j < carsInCurrentLane.length; j++) {
        const car2 = carsInCurrentLane[j];
        if (isCloseTo(car1.collisionArea, car2.collisionArea)) {
          if (car1.y < car2.y) car1.carNearMyBack = car2;
          else car2.carNearMyBack = car1;
        }
      }
    }
  }

  /**
   * Смена свободной полосы (вероятностное)
   */
  changeEmptyLane() {
    const changeEmptyLaneProbability = Math.random();

    if (changeEmptyLaneProbability >= 0.002) return;
    if (this.nextEmptyLane !== this.emptyLane) return;

    this.nextEmptyLane = getRandomIntBetweenInterval(0, GameConfig.scenario.numberOfLanes - 1);
    while (this.nextEmptyLane === this.emptyLane) {
      this.nextEmptyLane = getRandomIntBetweenInterval(0, GameConfig.scenario.numberOfLanes - 1);
    }
  }

  /**
   * Смена свободной полосы (если следующая пустая свободна от машин)
   */
  tryChangeEmptyLane() {
    if (this.nextEmptyLane !== this.emptyLane && !this.carsInLane(this.nextEmptyLane).length) {
      this.emptyLane = this.nextEmptyLane;
    }
  }

  /**
   * Проверка столкновения с игроком
   */
  verifyPlayerCollision() {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const player = this.carPlayer!;

    this.cars.forEach((car) => {
      if (car && isCollide(player.collisionArea, car.collisionArea)) this.gameOverRef.current = true;
    });
  }
}
