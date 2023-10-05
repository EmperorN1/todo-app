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

  render() {
    const { description, time, onDelete, onCompleted, onEdit, completed, checked, edited } = this.props;

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
          <input className="toggle" type="checkbox" checked={checked} onClick={onCompleted} />
          <label>
            <span className="description" onClick={onCompleted}>
              {description}
            </span>
            <span className="created">{time}</span>
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
