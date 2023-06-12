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
  };

  onDescrChange = (e) => {
    this.setState({
      description: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.description) {
      this.props.onAdd(this.state.description);
    }
    this.setState({
      description: '',
    });
  };

  render() {
    const { description } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <input
          type="text"
          className="new-todo"
          onChange={this.onDescrChange}
          value={description}
          placeholder="What needs to be done?"
          autoFocus
        />
      </form>
    );
  }
}
