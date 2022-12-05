import React from 'react';
import { Col, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { RoutePath } from '@/utils/router/routeConfig';
import './GameEnd.scss';

const { Title } = Typography;

interface IGameEnd {
  score: number;
}

export const GameEnd = ({ score }: IGameEnd) => (
  <Col className="game-end">
    <Title className="game-end__text">Игра окончена</Title>
    <Title className="game-end__text" level={2}>
      Ваш результат : {score}
    </Title>
    <Link className="game-end__link" to={RoutePath.main}>
      Главное меню
    </Link>
    <Link className="game-end__link" to={RoutePath.stats}>
      Таблица лучших
    </Link>
    <Title className="game-end__text_blink" level={3}>
      Для повтора нажмите любую клавишу
    </Title>
  </Col>
);
