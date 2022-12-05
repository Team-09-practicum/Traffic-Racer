import React from 'react';
import { Typography, Button } from 'antd';
import { Link } from 'react-router-dom';
import { appRoutes } from '@/utils/router/appRoutes';
import './GameEnd.scss';

const { Title } = Typography;

interface IGameEnd {
  score: number;
}

export const GameEnd = ({ score }: IGameEnd) => (
  <div className="game-end">
    <Title className="game-end__text">Игра окончена</Title>
    <Title className="game-end__text" level={2}>
      Ваш результат : {score}
    </Title>
    <Link className="game-end__link" to={appRoutes.main}>
      <Button ghost>Главное меню</Button>
    </Link>
    <Link className="game-end__link" to={appRoutes.stats}>
      <Button type="primary">Таблица лучших</Button>
    </Link>
    <Title className="game-end__text_blink" level={3}>
      Для повтора нажмите любую клавишу
    </Title>
  </div>
);
