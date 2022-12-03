/* eslint-disable react/prop-types */
import React, { Dispatch, FC, SetStateAction, useEffect, useRef } from 'react';
import { Scenario, Car, Traffic } from '../utils';
import { GameConfig } from '../utils/game.config';

type TrafficRacerProps = {
  height: number;
  width: number;
  setGameStarted: Dispatch<SetStateAction<boolean>>;
  setGameOver: Dispatch<SetStateAction<boolean>>;
  setScore: Dispatch<SetStateAction<number>>;
};

type Props = FC<TrafficRacerProps>;

export const TrafficRacer: Props = ({ height, width, setGameStarted, setGameOver, setScore }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasCtxRef = useRef<CanvasRenderingContext2D | null>(null);
  const animationID = useRef<number>();
  const isStarted = useRef(false);
  const isOver = useRef(false);

  let speed = GameConfig.level.initialSpeed;
  const setSpeed = (newSpeed: number) => {
    speed = newSpeed;
  };

  let scenario: Scenario;
  let player: Car;
  let traffic: Traffic;

  const showStartScreen = () => {
    if (canvasRef.current) {
      scenario = new Scenario(canvasRef.current);
      traffic = new Traffic(canvasRef.current, null, isOver);
    }
  };

  const draw = () => {
    if (!canvasCtxRef.current) return;
    canvasCtxRef.current.clearRect(0, 0, width, height);

    scenario.drawRoad();
    traffic.draw();

    if (isOver.current) {
      isStarted.current = false;
      setGameStarted(false);
      setGameOver(true);
    } else if (isStarted.current && player) {
      player.drawCar(canvasCtxRef.current);
    }
  };

  const update = () => {
    scenario.updateRoad(speed);
    traffic.update(speed);

    if (isStarted.current) setScore((prev) => prev + speed);
  };

  const startGame = () => {
    if (!canvasRef.current) return;

    player = new Car(GameConfig.player.initialY, GameConfig.player.carType);
    scenario = new Scenario(canvasRef.current);
    traffic = new Traffic(canvasRef.current, player, isOver);

    isStarted.current = true;
    isOver.current = false;
    setGameStarted(true);
    setGameOver(false);
    setScore(0);

    setSpeed(3);
  };

  const gameLoop = (() => {
    let oldTimeStamp = 0;

    return (timeStamp: number) => {
      const deltaTime = (timeStamp - oldTimeStamp) / 1000;
      if (deltaTime > 5) {
        oldTimeStamp = timeStamp;
        if (isStarted.current) {
          setSpeed(speed + GameConfig.level.amountIncrease);
        }
      }

      update();
      draw();
      requestAnimationFrame(gameLoop);
    };
  })();

  const handleKeydown = (event: KeyboardEvent) => {
    if (!isStarted.current) startGame();
    else if (event.code === 'ArrowLeft') {
      player.moveToLeft();
    } else if (event.code === 'ArrowRight') {
      player.moveToRight();
    }
  };

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (canvasRef.current) {
      canvasCtxRef.current = canvasRef.current.getContext('2d');

      showStartScreen();
      draw();

      animationID.current = requestAnimationFrame(gameLoop);

      document.addEventListener('keydown', handleKeydown);

      return () => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        cancelAnimationFrame(animationID.current!);
        document.removeEventListener('keydown', handleKeydown);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <canvas ref={canvasRef} height={height} width={width} />;
};
