import React, { useEffect, useRef, useState } from 'react';
import { Space, Typography, Row } from 'antd';
import { TrafficRacer } from './components/TrafficRacer/TrafficRacer';
import { GameStart } from './components/startGame/GameStart';
import { GameEnd } from './components/gameEnd/GameEnd';
import { useWindowSize } from '@/pages/gamePage/hooks/useWindowSize';
import './GamePage.scss';
import { SoundOffButton } from './components/soundOffButton/SoundOffButton';

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
        <Row>
          <Space className="game-page__sound">
            <SoundOffButton />
          </Space>
          <Space className="game-page__score" direction="vertical" align="end">
            <Text strong>Счёт:</Text>
            <Title>{score}</Title>
          </Space>
        </Row>
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
