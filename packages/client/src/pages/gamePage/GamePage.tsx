import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Space, Typography, Row } from 'antd';
import { ShrinkOutlined, ArrowsAltOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { TrafficRacer } from './components/TrafficRacer/TrafficRacer';
import { GameStart } from './components/startGame/GameStart';
import { GameEnd } from './components/gameEnd/GameEnd';
import { useWindowSize } from '@/pages/gamePage/hooks/useWindowSize';
import { SoundOffButton } from './components/soundOffButton/SoundOffButton';
import { updateLeaderboard } from '@/controllers/updateLeaderboard';
import { getUserIdLoginAvatar } from '@/utils/store/selectors/getUserFieldSelectors/getUserFieldSelectors';
import './GamePage.scss';

const { Text, Title } = Typography;

const fullscreenIconClassName = 'game-page__fullscreen-button-icon';

export const GamePage = () => {
  const { height } = useWindowSize();
  const [pageTopOffset, setPageTopOffset] = useState(0);
  const [isGameStarted, setGameStarted] = useState(false);
  const [isGameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isFullscreenMode, setFullscreenMode] = useState(false);
  const isFirstStart = !isGameStarted && !isGameOver;
  const gamePageRef = useRef<HTMLDivElement>(null);
  const user = useSelector(getUserIdLoginAvatar);

  useEffect(() => {
    if (gamePageRef.current) setPageTopOffset(gamePageRef.current.getBoundingClientRect().top);
  }, []);

  useEffect(() => {
    if (score < 0) setScore(0);
  }, [score]);

  useEffect(() => {
    if (user && isGameOver) {
      const updateScore = async () => {
        await updateLeaderboard({
          id: user.id as number,
          username: user.login as string,
          avatar: user.avatar as string | null,
          score,
        });
      };
      updateScore();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isGameOver, user]);

  const toggleFullscreen = useCallback(() => {
    const game = gamePageRef.current;

    if (game) {
      if (isFullscreenMode && document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        game.requestFullscreen();
      }
      setFullscreenMode(!isFullscreenMode);
    }
  }, [isFullscreenMode]);

  useEffect(() => {
    const handleExitFullscreen = () => {
      if (!document.fullscreenElement) {
        setFullscreenMode(false);
      }
    };

    const toggleFullscreenByKeys = (event: KeyboardEvent) => {
      if (event.shiftKey && event.key === 'F11') {
        toggleFullscreen();
      }
    };

    document.addEventListener('fullscreenchange', handleExitFullscreen);
    document.addEventListener('keydown', toggleFullscreenByKeys);

    return () => {
      document.removeEventListener('fullscreenchange', handleExitFullscreen);
      document.removeEventListener('keydown', toggleFullscreenByKeys);
    };
  }, [toggleFullscreen]);

  return (
    <div ref={gamePageRef} className="game-page">
      {isFirstStart && <GameStart />}
      {isGameOver && <GameEnd score={score} />}
      {isGameStarted && (
        <Row>
          <Space className="game-page__sound">
            <SoundOffButton />
          </Space>
          <Space className="game-page__score" direction="vertical" align="end">
            <Text strong>Счёт:</Text>
            <Title>{score}</Title>
          </Space>
        </Row>
      )}

      <TrafficRacer
        height={isFullscreenMode ? height : height - pageTopOffset}
        setGameStarted={setGameStarted}
        setGameOver={setGameOver}
        setScore={setScore}
      />

      <button type="button" className="game-page__fullscreen-button" onClick={toggleFullscreen}>
        {isFullscreenMode ? (
          <ShrinkOutlined className={fullscreenIconClassName} />
        ) : (
          <ArrowsAltOutlined className={fullscreenIconClassName} />
        )}
      </button>
    </div>
  );
};
