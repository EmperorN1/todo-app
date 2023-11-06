import React from 'react';
import PropTypes from 'prop-types';
import './timer.css';

const Timer = ({ time, onStart, onStop }) => {
  const formatTimer = (seconds) => {
    let secondsTwoNumbers = seconds % 60;
    if (secondsTwoNumbers.toString().length < 2) {
      secondsTwoNumbers = '0' + secondsTwoNumbers;
    }
    return `${Math.floor(seconds / 60)}:${secondsTwoNumbers}`;
  };
  return (
    <React.Fragment>
      <span className="description">
        <span className="icon icon-play" onClick={onStart}></span>
        <span className="icon icon-pause" onClick={onStop}></span>
        {formatTimer(time)}
      </span>
    </React.Fragment>
  );
};

export default Timer;

Timer.propTypes = {
  time: PropTypes.string.isRequired,
};
