import React, { useEffect, useRef, useState } from 'react';
import { Space, Typography } from 'antd';
import { TrafficRacer } from './components/TrafficRacer/TrafficRacer';
import { GameStart } from './components/startGame/GameStart';
import { GameEnd } from './components/gameEnd/GameEnd';
import { useWindowSize } from '@/pages/gamePage/hooks/useWindowSize';
import './GamePage.scss';

const { Text, Title } = Typography;

export const GamePage = () => {
  const { height } = useWindowSize();
  const [pageTopOffset, setPageTopOffset] = useState(0);
  const [isGameStarted, setGameStarted] = useState(false);
  const [isGameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const isFirstStart = !isGameStarted && !isGameOver;
  const gamePageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (gamePageRef.current) setPageTopOffset(gamePageRef.current.getBoundingClientRect().top);
  }, []);

  return (
    <div ref={gamePageRef} className="game-page">
      {isFirstStart && <GameStart />}
      {isGameOver && <GameEnd score={score} />}
      {isGameStarted && (
        <div className="game-page__score">
          <Space direction="vertical" align="end">
            <Text strong>Счёт:</Text>
            <Title>{score}</Title>
          </Space>
        </div>
      )}

      <TrafficRacer
        height={height - pageTopOffset}
        setGameStarted={setGameStarted}
        setGameOver={setGameOver}
        setScore={setScore}
      />
    </div>
  );
};
