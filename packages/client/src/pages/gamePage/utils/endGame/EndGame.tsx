import React from 'react';
import { Link } from 'react-router-dom';
import { RoutePath } from '@/utils/router/routeConfig';
import './EndGame.scss';

interface EndGameProps {
  score: number;
}

const EndGame = ({ score }: EndGameProps) => (
  <div className="gameOverPage">
    <h1 className="gameOverPage__text">Игра окончена</h1>
    <h2 className="gameOverPage__text">Ваш результат: {score}</h2>
    <Link className="gameOverPage__link" to={RoutePath.main}>
      Главное меню
    </Link>
    <Link className="gameOverPage__link" to={RoutePath.stats}>
      Таблица лучших
    </Link>
    <div className="blink"> Для повтора нажмите любую клавишу </div>
  </div>
);

export default EndGame;
