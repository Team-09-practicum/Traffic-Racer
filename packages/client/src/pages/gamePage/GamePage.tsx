import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { RoutePath } from '@/utils/router/routeConfig';
import { TrafficRacer } from './components/TrafficRacer';
import StartGame from './utils/startGame/startGame';
import EndGame from './utils/endGame/EndGame';

export const GamePage = () => {
  const [isGameStarted, setGameStarted] = useState(false);
  const [isGameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const isFirstStart = !isGameStarted && !isGameOver;

  return (
    <div>
      <Link to={RoutePath.main}> Главное меню </Link>

      {isFirstStart && <StartGame />}
      {isGameStarted && <div>Игра началась</div>}
      {isGameOver && <EndGame score={score} />}
      <div>Score: {score}</div>

      <TrafficRacer
        height={500}
        width={800}
        setGameStarted={setGameStarted}
        setGameOver={setGameOver}
        setScore={setScore}
      />
    </div>
  );
};
