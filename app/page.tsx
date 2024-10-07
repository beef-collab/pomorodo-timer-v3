'use client'; // Enable client-side rendering for this component

import { useState, useEffect } from 'react';

export default function Home() {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime === 0) {
            clearInterval(interval);
            setIsRunning(false);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isRunning]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds
      .toString()
      .padStart(2, '0')}`;
  };

  const startTimer = () => {
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(25 * 60);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <h1>Pomodoro Timer</h1>
      <div style={{ fontSize: '48px', margin: '20px' }}>{formatTime(timeLeft)}</div>
      <div>
        <button onClick={startTimer} style={{ marginRight: '10px' }}>Start</button>
        <button onClick={stopTimer} style={{ marginRight: '10px' }}>Stop</button>
        <button onClick={resetTimer}>Reset</button>
      </div>
    </div>
  );
}
