import { GameConfig } from './game.config';
import car1 from '../assets/traffic/car1.png';
import car2 from '../assets/traffic/car2.png';
import car3 from '../assets/traffic/car3.png';
import car4 from '../assets/traffic/car4.png';
import car5 from '../assets/traffic/car5.png';
import car6 from '../assets/traffic/car6.png';
import car7 from '../assets/traffic/car7.png';
import car8 from '../assets/traffic/car8.png';
import car9 from '../assets/traffic/car9.png';
import car10 from '../assets/traffic/car10.png';

import { isCloseToY } from './helpers';
import { wheelSkidSound } from './wheelSkidSound';

export type CollisionArea = {
  x: number;
  y: number;
  height: number;
  width: number;
};

interface ICar {
  step: number;
  positions: number[];
  currentLane: number;
  nextLane: number;
  carImage: HTMLImageElement;
  carNearMyBack?: ICar;
  carSpeed: number;
  isMovingLeft: boolean;
  isMovingRight: boolean;
  x: number;
  y: number;
  height: number;
  width: number;
  collisionArea: CollisionArea;
  showCollisionArea: boolean;
  isSliding: boolean;
  passedOnPuddle: boolean;
}

/**
 * Класс автомобиля
 */
export class Car implements ICar {
  step = 0.1;

  positions = [0, 1, 2, 3];

  currentLane = this.positions[0];

  nextLane = this.positions[0];

  carImage = new Image();

  static carTypeArray: string[] = [car1, car2, car3, car4, car5, car6, car7, car8, car9, car10];

  carNearMyBack!: ICar | undefined;

  carSpeed = 0.0;

  isMovingLeft!: boolean;

  isMovingRight!: boolean;

  x!: number;

  y!: number;

  height = GameConfig.traffic.carHeight;

  width = GameConfig.traffic.carWidth;

  collisionArea: CollisionArea;

  showCollisionArea = false;

  skidSound: HTMLAudioElement | undefined;

  isSliding!: boolean;

  passedOnPuddle!: boolean;

  /**
   * Конструктор класса.
   * @param {number} initialPosition - Начальная позиция Y.
   * @param {number} carTypeId - Ид/индекс типа машины (картинки).
   */
  constructor(initialPosition: number, carTypeId: number) {
    this.carImage.src = Car.carTypeArray[carTypeId];
    this.isMovingLeft = false;
    this.isMovingRight = false;
    this.isSliding = false;
    this.passedOnPuddle = false;
    this.y = initialPosition;

    this.collisionArea = {
      x: this.x,
      y: this.y,
      height: this.height * 0.8,
      width: this.width * 0.4,
    };

    this.updatePositionXAccordingLane(this.currentLane);
  }

  /**
   * Статический метод класса
   * @returns {number} Кличество типов автомобилей
   */
  static getCarTypesLength() {
    return this.carTypeArray.length;
  }

  /**
   * Получение текущей полосы автомобиля
   * @returns {number} Текущая полоса автомобиля.
   */
  getCurrentLane() {
    return this.currentLane;
  }

  /**
   * Движение автомобиля влево
   */
  moveToLeft(soundValue: boolean | undefined) {
    if (this.isMovingRight || this.isMovingLeft) return;
    if (this.currentLane <= this.positions[0]) return;

    this.nextLane = this.currentLane - 1;
    this.movingLeft();
    this.skidSound = wheelSkidSound();
    if (soundValue) {
      this.skidSound.play();
    }
    this.isMovingLeft = true;
    this.isMovingRight = false;
  }

  /**
   * Движение автомобиля вправо
   */
  moveToRight(soundValue: boolean | undefined) {
    if (this.isMovingRight || this.isMovingLeft) return;
    if (this.currentLane >= this.positions[this.positions.length - 1]) return;

    this.nextLane = this.currentLane + 1;
    this.movingRight();
    this.skidSound = wheelSkidSound();
    if (soundValue) {
      this.skidSound.play();
    }
    this.isMovingLeft = false;
    this.isMovingRight = true;
  }

  movingLeft() {
    if (this.isMovingLeft) {
      this.currentLane -= this.step;
    }
    if (this.currentLane <= this.nextLane) {
      this.isMovingLeft = false;
      this.currentLane = this.nextLane;
    }
  }

  movingRight() {
    if (this.isMovingRight) this.currentLane += this.step;
    if (this.currentLane >= this.nextLane) {
      this.isMovingRight = false;
      this.currentLane = this.nextLane;
    }
  }

  /**
   * Проверка на скорое возникновение аварии (для AI-машин)
   */
  checkCollision() {
    // Если к текущей AI-машине сзади приближается другая, нужно увеличить скорость у первой
    if (this.carNearMyBack) {
      this.increaseSpeed(0.005);

      // Если подъехала вплотную, уравниваем скорости
      if (isCloseToY(this.collisionArea, this.carNearMyBack.collisionArea, GameConfig.collision.minCloseDistance)) {
        this.carSpeed = this.carNearMyBack.carSpeed;
      }
    }
  }

  /**
   * Отрисовка автомобиля
   * @param {CanvasRenderingContext2D} context - Контекст Canvas.
   */
  drawCar(context: CanvasRenderingContext2D) {
    if (this.isMovingLeft) {
      this.movingLeft();
      this.updatePositionXAccordingLane(this.currentLane);
    }

    if (this.isMovingRight) {
      this.movingRight();
      this.updatePositionXAccordingLane(this.currentLane);
    }

    context.drawImage(this.carImage, this.x, this.y, this.width, this.height);

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
   * Обновление позиции X автомобиля согласно занимаемой полосы
   * @param {number} lane - Полоса.
   */
  updatePositionXAccordingLane(lane: number) {
    this.x = lane * GameConfig.scenario.lanesSize + GameConfig.roadside.width;
    this.collisionArea.x = this.x + this.width / 2 - this.collisionArea.width / 2;
  }

  /**
   * Обновление позиции Y автомобиля
   * @param {number} yPosition - Координата Y.
   */
  setY(yPosition: number) {
    this.y = yPosition;
    this.collisionArea.y = this.y;
  }

  /**
   * Получение позиции Y автомобиля
   * @returns {number} Координата Y.
   */
  getY() {
    return this.y;
  }

  /**
   * Установка текущей полосы автомобиля
   * @param {number} lane - Полоса.
   */
  setCurrentLane(lane: number) {
    if (lane < 0) {
      [this.currentLane] = this.positions;
    } else if (lane > this.positions.length) {
      this.currentLane = this.positions[this.positions.length - 1];
    } else {
      this.currentLane = this.positions[lane];
    }
    this.updatePositionXAccordingLane(this.currentLane);
  }

  /**
   * Установка скорости автомобиля
   * @param {number} speed - Скорость.
   */
  setCarSpeed(speed: number) {
    if (speed < GameConfig.traffic.minCarSpeed) this.carSpeed = GameConfig.traffic.minCarSpeed;
    else if (speed > GameConfig.traffic.maxCarSpeed) this.carSpeed = GameConfig.traffic.maxCarSpeed;
    else this.carSpeed = +speed.toFixed(1);
  }

  /**
   * Получение скорости автомобиля
   * @returns {number} Скорость.
   */
  getCarSpeed() {
    return 1 - this.carSpeed;
  }

  /**
   * Увеличение скорости автомобиля на заданную величину
   * @param {number} amount - Величина, на которую увеличивается скорость.
   */
  increaseSpeed(amount: number) {
    const newSpeed = this.getCarSpeed() + amount;
    this.setCarSpeed(newSpeed);
  }
}
