import React, { useState, useEffect } from 'react';
import './CountdownTimer.css'; 
import InputForm from './InputForm';
import CountdownDisplay from './CountdownDisplay';

const CountdownTimer = () => {
  const [targetDate, setTargetDate] = useState(localStorage.getItem('targetDate') || '');
  const [countdown, setCountdown] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [timerCompleted, setTimerCompleted] = useState(false);

  const handleInputChange = (e) => {
    setTargetDate(e.target.value);
    localStorage.setItem('targetDate', e.target.value);
    setTimerCompleted(false); 
  };

  const startCountdown = () => {
    const targetTime = new Date(targetDate).getTime();
    const now = new Date().getTime();
    const timeRemaining = targetTime - now;

    const maxTime = 100 * 24 * 60 * 60 * 1000;
    if (timeRemaining > 0) {
      if (timeRemaining <= maxTime) {
        setCountdown(timeRemaining);
        setErrorMessage('');
        setTimerCompleted(false);
      } else {
        setErrorMessage('Selected time is more than 100 days');
      }
    }
  };

  const stopCountdown = () => {
    setCountdown(0); 
    setTimerCompleted(false);
  };

  useEffect(() => {
    if (countdown !== null && countdown !== 0) {
      const interval = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown > 1000) {
            return prevCountdown - 1000;
          } else {
            clearInterval(interval);
            setTimerCompleted(true); 
            return 0;
          }
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [countdown]);

  useEffect(() => {
    const storedDate = localStorage.getItem('targetDate');
    if (storedDate && new Date(storedDate) > new Date()) {
      startCountdown();
    }
  }, []);

  const isCountdownRunning = countdown !== null && countdown !== 0;

  return (
    <div className="countdown-container">
      <h1><span style={{ color: 'white', marginRight:"10px" }}>Countdown</span>
      <span style={{ color: 'purple' }}>Timer</span></h1>
      <InputForm
        targetDate={targetDate}
        onInputChange={handleInputChange}
        onStartCountdown={startCountdown}
        onStopCountdown={stopCountdown}
        isCountdownRunning={isCountdownRunning}
      />
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {timerCompleted && <p>The countdown is over! What's next on your adventure?</p>}
      <CountdownDisplay countdown={countdown} />
    </div>
  );
};

export default CountdownTimer;
