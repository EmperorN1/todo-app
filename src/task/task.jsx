import React from 'react';
import PropTypes from 'prop-types';
import './task.css';
import '../index.css';

export default class Task extends React.Component {
  static propTypes = {
    description: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    checked: PropTypes.bool.isRequired,
    time: PropTypes.string.isRequired,
  };

  state = {
    inputText: '',
  };

  // componentDidUpdate() {                                         отвергнуто
  //   if (this.props.time <= 0 && this.props.counting) {           таймер не останавливается на нуле
  //     this.props.onStop();                                       при смене вкладок
  //     alert(`Task is timed out`);
  //   }
  // }

  // componentWillUnmount() {                                       отвергнуто
  //   this.props.onStop();                                         таймер останавливается при смене вкладок
  // }

  changeText = (e) => {
    this.setState({
      inputText: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.inputText) {
      this.props.completeEditing(this.state.inputText, this.props.id);
    } else {
      this.props.completeEditing(this.props.description, this.props.id);
    }
  };

  formatTimer = (seconds) => {
    let secondsTwoNumbers = seconds % 60;
    if (secondsTwoNumbers.toString().length < 2) {
      secondsTwoNumbers = '0' + secondsTwoNumbers;
    }
    return `${Math.floor(seconds / 60)}:${secondsTwoNumbers}`;
  };

  render() {
    const { description, create, time, onDelete, onCompleted, onEdit, onStart, onStop, completed, checked, edited } =
      this.props;

    let className = 'view';
    if (completed) {
      className += ' completed';
    }
    if (edited) {
      className += ' editing';
    }

    return (
      <span className={className}>
        <div className="view">
          <input className="toggle" type="checkbox" checked={checked} onChange={onCompleted} />
          <label>
            <span className="title" onClick={onCompleted}>
              {description}
            </span>
            <span className="description">
              <button className="icon icon-play" onClick={onStart}></button>
              <button className="icon icon-pause" onClick={onStop}></button>
              {this.formatTimer(time)}
            </span>
            <span className="created">{create}</span>
          </label>
          <button className="icon icon-edit" onClick={onEdit}></button>
          <button className="icon icon-destroy" onClick={onDelete}></button>
        </div>
        <form onSubmit={this.onSubmit}>
          <input type="text" className="edit" onChange={this.changeText} defaultValue={description}></input>
        </form>
      </span>
    );
  }
}
