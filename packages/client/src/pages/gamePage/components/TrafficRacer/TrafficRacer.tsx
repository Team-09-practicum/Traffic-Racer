/* eslint-disable react/prop-types */
import React, { Dispatch, FC, SetStateAction, useEffect, useRef, memo } from 'react';
import { useSelector } from 'react-redux';
import { Scenario, Car, Traffic, GameConfig, crashSound } from '../../utils';
import './TrafficRacer.scss';
import { getIsSoundOn } from '@/utils/store/selectors/getAppStatusSelectors/getAppStatusSelectors';
import gameSoundPath from '../../assets/sounds/gameSound.mp3';

type TrafficRacerProps = {
  height: number;
  setGameStarted: Dispatch<SetStateAction<boolean>>;
  setGameOver: Dispatch<SetStateAction<boolean>>;
  setScore: Dispatch<SetStateAction<number>>;
};

type Props = FC<TrafficRacerProps>;

export const TrafficRacer: Props = memo(({ height, setGameStarted, setGameOver, setScore }) => {
  const isSoundOn = useRef<boolean>();
  isSoundOn.current = useSelector(getIsSoundOn);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasCtxRef = useRef<CanvasRenderingContext2D | null>(null);
  const animationID = useRef<number>();
  const isStarted = useRef(false);
  const isOver = useRef(false);
  const localHeight = useRef<number>(height);
  const gameThemeSound = useRef<HTMLAudioElement | null>(null);
  let speed = GameConfig.level.initialSpeed;
  let playedCrash: boolean;
  const setSpeed = (newSpeed: number) => {
    speed = newSpeed;
  };

  const scenario = useRef<Scenario>();
  const player = useRef<Car>();
  let traffic: Traffic;

  const showStartScreen = () => {
    if (canvasRef.current) {
      scenario.current = new Scenario(canvasRef.current);
      traffic = new Traffic(canvasRef.current, null, isOver, scenario.current);
    }
  };

  const draw = () => {
    if (!canvasCtxRef.current) return;
    canvasCtxRef.current.clearRect(0, 0, GameConfig.general.width, localHeight.current);

    scenario.current?.drawRoad();
    traffic.draw();

    if (isOver.current) {
      if (!playedCrash) {
        if (isSoundOn.current) {
          crashSound().play();
        }
        playedCrash = true;
      }
      gameThemeSound.current?.pause();
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

    if (player.current?.passedOnPuddle) {
      setScore((prev) => prev - GameConfig.obstacle.pointsLossOnPuddle);
      player.current.passedOnPuddle = false;
    }
  };

  const startGame = () => {
    if (!canvasRef.current) return;
    playedCrash = false;
    if (!gameThemeSound.current) return;
    gameThemeSound.current.currentTime = 0;
    gameThemeSound.current.play();
    gameThemeSound.current.volume = 0.3;
    gameThemeSound.current.muted = !isSoundOn.current;

    player.current = new Car(localHeight.current - GameConfig.traffic.carHeight - 10, GameConfig.player.carType);
    scenario.current = new Scenario(canvasRef.current);
    traffic = new Traffic(canvasRef.current, player.current, isOver, scenario.current);

    isStarted.current = true;
    isOver.current = false;
    setGameStarted(true);
    setGameOver(false);
    setScore(0);

    setSpeed(3);
  };

  const gameLoop = (() => {
    let oldTimeStamp = 0;
    let scoreTimeStamp = 0;
    const scoreUpdateInterval = 1 / 20; // 20 кадров в секунду

    return (timeStamp: number) => {
      const deltaTime = (timeStamp - oldTimeStamp) / 1000;
      const scoreDeltaTime = (timeStamp - scoreTimeStamp) / 1000;
      if (deltaTime > 5) {
        oldTimeStamp = timeStamp;
        if (isStarted.current) {
          setSpeed(speed + GameConfig.level.amountIncrease);
        }
      }

      if (scoreDeltaTime > scoreUpdateInterval && isStarted.current) {
        setScore((prev) => prev + speed);
        scoreTimeStamp = timeStamp;
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
      player.current?.moveToLeft(isSoundOn.current);
    } else if (event.code === 'ArrowRight') {
      player.current?.moveToRight(isSoundOn.current);
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
    if (!gameThemeSound.current) return;
    gameThemeSound.current.muted = isStarted.current && !isSoundOn.current;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSoundOn.current]);

  useEffect(() => {
    localHeight.current = height;

    if (scenario.current) scenario.current.setRoadImageHeight(height);
    if (player.current) player.current.setY(height - GameConfig.traffic.carHeight - 10);
  }, [height]);

  return (
    <div className="traffic-racer" style={{ backgroundColor: GameConfig.general.background }}>
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <audio ref={gameThemeSound} src={gameSoundPath} loop />
      <canvas ref={canvasRef} height={height} width={GameConfig.general.width} />
    </div>
  );
});
