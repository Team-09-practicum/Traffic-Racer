/* eslint-disable react/prop-types */
import React, { Dispatch, FC, SetStateAction, useEffect, useRef, memo } from 'react';
import { Scenario, Car, Traffic } from '../../utils';
import { GameConfig } from '../../utils/game.config';
import './TrafficRacer.scss';

type TrafficRacerProps = {
  height: number;
  setGameStarted: Dispatch<SetStateAction<boolean>>;
  setGameOver: Dispatch<SetStateAction<boolean>>;
  setScore: Dispatch<SetStateAction<number>>;
};

type Props = FC<TrafficRacerProps>;

export const TrafficRacer: Props = memo(({ height, setGameStarted, setGameOver, setScore }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasCtxRef = useRef<CanvasRenderingContext2D | null>(null);
  const animationID = useRef<number>();
  const isStarted = useRef(false);
  const isOver = useRef(false);
  const localHeight = useRef<number>(height);

  let speed = GameConfig.level.initialSpeed;
  const setSpeed = (newSpeed: number) => {
    speed = newSpeed;
  };

  const scenario = useRef<Scenario>();
  const player = useRef<Car>();
  let traffic: Traffic;

  const showStartScreen = () => {
    if (canvasRef.current) {
      scenario.current = new Scenario(canvasRef.current);
      traffic = new Traffic(canvasRef.current, null, isOver);
    }
  };

  const draw = () => {
    if (!canvasCtxRef.current) return;
    canvasCtxRef.current.clearRect(0, 0, GameConfig.general.width, localHeight.current);

    scenario.current?.drawRoad();
    traffic.draw();

    if (isOver.current) {
      isStarted.current = false;
      setGameStarted(false);
      setGameOver(true);
    } else if (isStarted.current && player) {
      player.current?.drawCar(canvasCtxRef.current);
    }
  };

  const update = () => {
    scenario.current?.updateRoad(speed);
    traffic.update(speed);

    if (isStarted.current) setScore((prev) => prev + speed);

    if (player.current?.passedOnPuddle) {
      setScore((prev) => prev - GameConfig.obstacle.pointsLossOnPuddle);

      player.current.passedOnPuddle = false;
    }
  };

  const startGame = () => {
    if (!canvasRef.current) return;

    player.current = new Car(localHeight.current - GameConfig.traffic.carHeight - 10, GameConfig.player.carType);
    scenario.current = new Scenario(canvasRef.current);
    traffic = new Traffic(canvasRef.current, player.current, isOver);

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
      animationID.current = requestAnimationFrame(gameLoop);
    };
  })();

  const handleKeydown = (event: KeyboardEvent) => {
    if (event.shiftKey && event.key === 'F11') {
      return;
    }

    if (!isStarted.current) startGame();
    else if (event.code === 'ArrowLeft') {
      player.current?.moveToLeft();
    } else if (event.code === 'ArrowRight') {
      player.current?.moveToRight();
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

  useEffect(() => {
    localHeight.current = height;

    if (scenario.current) scenario.current.setRoadImageHeight(height);
    if (player.current) player.current.setY(height - GameConfig.traffic.carHeight - 10);
  }, [height]);

  return (
    <div className="traffic-racer" style={{ backgroundColor: GameConfig.general.background }}>
      <canvas ref={canvasRef} height={height} width={GameConfig.general.width} />
    </div>
  );
});
