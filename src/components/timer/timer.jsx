import React from 'react';
import PropTypes from 'prop-types';
import './timer.css';

export default class Timer extends React.Component {
  static propTypes = {
    time: PropTypes.string.isRequired,
  };

  formatTimer = (seconds) => {
    let secondsTwoNumbers = seconds % 60;
    if (secondsTwoNumbers.toString().length < 2) {
      secondsTwoNumbers = '0' + secondsTwoNumbers;
    }
    return `${Math.floor(seconds / 60)}:${secondsTwoNumbers}`;
  };
  render() {
    const { time, onStart, onStop } = this.props;
    return (
      <React.Fragment>
        <span className="description">
          <span className="icon icon-play" onClick={onStart}></span>
          <span className="icon icon-pause" onClick={onStop}></span>
          {this.formatTimer(time)}
        </span>
      </React.Fragment>
    );
  }
}
