import React from 'react';
import './GameStart.scss';
import { Typography } from 'antd';

const { Title } = Typography;

export const GameStart = () => (
  <div className="game-start">
    <Title className="game-start__text" level={3}>
      Используйте ← → для маневрирования
    </Title>
    <Title className="game-start__text_blink" level={3}>
      Нажмите любую клавишу для старта
    </Title>
  </div>
);
