import React from 'react';
import './new-task-form.css';
import '../index.css';

export default class NewTaskForm extends React.Component {
  static defaultProps = {
    onAdd: () => {
      throw new Error('There is an Error in adding new task');
    },
  };

  state = {
    description: '',
    minutes: '',
    seconds: '',
  };

  onDescrChange = (e) => {
    this.setState({
      description: e.target.value,
    });
    if (e.key == 'Enter') {
      this.onSubmit(e);
    }
  };

  onTimeChangeMin = (e) => {
    if (e.target.value.length <= 2) {
      this.setState({
        minutes: e.target.value,
      });
    }
    if (e.key == 'Enter') {
      this.onSubmit(e);
    }
  };

  onTimeChangeSec = (e) => {
    if (e.target.value.length <= 2) {
      this.setState({
        seconds: e.target.value,
      });
    }
    if (e.key == 'Enter') {
      this.onSubmit(e);
    }
  };

  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.description && this.state.minutes && this.state.seconds) {
      const seconds = +this.state.seconds + this.state.minutes * 60;
      this.props.onAdd(this.state.description, seconds);
      this.setState({
        description: '',
        minutes: '',
        seconds: '',
      });
    }
  };

  render() {
    const { description, minutes, seconds } = this.state;
    return (
      <form>
        <input
          type="text"
          className="new-todo"
          onChange={this.onDescrChange}
          value={description}
          placeholder="What needs to be done?"
          autoFocus
        />
        <input
          type="number"
          className="new-todo-form__timer"
          onChange={this.onTimeChangeMin}
          placeholder="Min"
          autoFocus
          value={minutes}
        />
        <input
          type="number"
          className="new-todo-form__timer"
          onChange={this.onTimeChangeSec}
          placeholder="Sec"
          autoFocus
          value={seconds}
        />
        <button onClick={this.onSubmit}></button>
      </form>
    );
  }
}
