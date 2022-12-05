import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { appRoutes } from '@/utils/router/appRoutes';
import { TrafficRacer } from './components/TrafficRacer';
import { GameStart } from './components/startGame/GameStart';
import { GameEnd } from './components/gameEnd/GameEnd';

export const GamePage = () => {
  const [isGameStarted, setGameStarted] = useState(false);
  const [isGameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const isFirstStart = !isGameStarted && !isGameOver;

  return (
    <div>
      <Link to={appRoutes.main}> Главное меню </Link>

      {isFirstStart && <GameStart />}
      {isGameStarted && <div>Игра началась</div>}
      {isGameOver && <GameEnd score={score} />}
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
