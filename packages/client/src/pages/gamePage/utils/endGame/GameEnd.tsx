import React from 'react';
import { Link } from 'react-router-dom';
import { RoutePath } from '@/utils/router/routeConfig';
import './GameEnd.scss';

interface GameEndProps {
  score: number;
}

const GameEnd = ({ score }: GameEndProps) => (
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

export default GameEnd;
