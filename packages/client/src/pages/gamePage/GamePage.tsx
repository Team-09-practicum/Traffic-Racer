import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { RoutePath } from '@/utils/router/routeConfig';
import { TrafficRacer } from './components/TrafficRacer';

export const GamePage = () => {
  const [isGameStarted, setGameStarted] = useState(false);
  const [isGameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const isFirstStart = !isGameStarted && !isGameOver;

  return (
    <div>
      <Link to={RoutePath.main}> Главное меню </Link>

      {isFirstStart && <div>Нажмите любую клавишу для старта</div>}
      {isGameStarted && <div>Игра началась</div>}
      {isGameOver && <div>Game Over</div>}
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
