import React from 'react';
import "./CountdownDisplay.css"
const CountdownDisplay = ({ countdown }) => {
  const formatTime = (time) => {
    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  };

  const { days, hours, minutes, seconds } = formatTime(countdown);

  return (
    <div className="countdown-display">
      <div className="countdown-box">
        <span>{days}</span>
        <span>Days</span>
      </div>
      <div className="countdown-box">
        <span>{hours}</span>
        <span>Hours</span>
      </div>
      <div className="countdown-box">
        <span>{minutes}</span>
        <span>Minutes</span>
      </div>
      <div className="countdown-box">
        <span>{seconds}</span>
        <span>Seconds</span>
      </div>
    </div>
  );
};

export default CountdownDisplay;
