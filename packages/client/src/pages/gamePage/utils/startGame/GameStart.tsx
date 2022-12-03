import React from 'react';
import './GameStart.scss';

const GameStart = () => (
  <div className="modalWindow">
    <div className="modalWindow__blink">
      <h3 className="modalWindow__blink__text__instr">
        Используйте ← → для маневрирования
      </h3>
      <h3 className="modalWindow__blink__text">
        Нажмите любую клавишу для старта
      </h3>
    </div>
  </div>
);

export default GameStart;
