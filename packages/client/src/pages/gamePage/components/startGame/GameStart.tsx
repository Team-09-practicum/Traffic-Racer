import React from 'react';
import './GameStart.scss';
import { Typography, Space } from 'antd';

const { Title } = Typography;

export const GameStart = () => (
  <div className="game-start">
    <Space className="game-start__text">
      <Title level={3}>Используйте</Title>
      <Title keyboard>←</Title>
      <Title keyboard>→</Title>
      <Title className="game-start__text" level={3}>
        для маневрирования
      </Title>
    </Space>

    <Title className="game-start__text_blink" level={3}>
      Нажмите любую клавишу для старта
    </Title>
  </div>
);
