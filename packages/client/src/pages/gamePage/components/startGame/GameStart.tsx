import React from 'react';
import './GameStart.scss';
import { Typography, Space } from 'antd';

const { Title, Paragraph } = Typography;

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

    <div className="game-start__fullscreen-instructions">
      <Title level={4} className="game-start__fullscreen-text-instructions">
        <Paragraph keyboard className="game-start__fullscreen-buttons">
          SHIFT + F11
        </Paragraph>
        - переключить полноэкранный режим
      </Title>
    </div>

    <Title className="game-start__text_blink" level={3}>
      Нажмите любую клавишу для старта
    </Title>
  </div>
);
