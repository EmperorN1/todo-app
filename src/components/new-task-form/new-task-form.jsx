import React, { useState } from 'react';
import './new-task-form.css';

const NewTaskForm = ({ onAdd }) => {
  // static defaultProps = {
  //   onAdd: () => {
  //     throw new Error('There is an Error in adding new task');
  //   },
  // };

  const [description, setDescription] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');

  const onDescrChange = (e) => {
    setDescription(e.target.value);
    if (e.key == 'Enter') {
      onSubmit(e);
    }
  };

  const onTimeChangeMin = (e) => {
    if (e.target.value.length <= 2) {
      setMinutes(e.target.value);
    }
    if (e.key == 'Enter') {
      onSubmit(e);
    }
  };

  const onTimeChangeSec = (e) => {
    if (e.target.value.length <= 2) {
      setSeconds(e.target.value);
    }
    if (e.key == 'Enter') {
      onSubmit(e);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (description && minutes && seconds) {
      const sec = +seconds + minutes * 60;
      onAdd(description, sec);
      setDescription('');
      setMinutes('');
      setSeconds('');
    }
  };

  return (
    <form>
      <input
        type="text"
        className="new-todo"
        onChange={onDescrChange}
        value={description}
        placeholder="What needs to be done?"
        autoFocus
      />
      <input
        type="number"
        className="new-todo-form__timer"
        onChange={onTimeChangeMin}
        placeholder="Min"
        autoFocus
        value={minutes}
      />
      <input
        type="number"
        className="new-todo-form__timer"
        onChange={onTimeChangeSec}
        placeholder="Sec"
        autoFocus
        value={seconds}
      />
      <button onClick={onSubmit}></button>
    </form>
  );
};

export default NewTaskForm;
