import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './task.css';

import Timer from '../timer';

const Task = ({
  id,
  description,
  create,
  counting,
  time,
  onDelete,
  onCompleted,
  onEdit,
  completed,
  checked,
  edited,
  countDown,
  completeEditing,
}) => {
  const [inputText, setInputText] = useState('');

  const changeText = (e) => {
    setInputText(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (inputText) {
      completeEditing(inputText, id);
    } else {
      completeEditing(description, id);
    }
  };

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
          <Timer
            time={time}
            onStart={() => countDown('start', id, counting, time)}
            onStop={() => countDown('stop', id, counting, time)}
          />
          <span className="created">{create}</span>
        </label>
        <button className="icon icon-edit" onClick={onEdit}></button>
        <button className="icon icon-destroy" onClick={onDelete}></button>
      </div>
      <form onSubmit={onSubmit}>
        <input type="text" className="edit" onChange={changeText} defaultValue={description}></input>
      </form>
    </span>
  );
};

Task.propTypes = {
  description: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  checked: PropTypes.bool.isRequired,
  edited: PropTypes.bool.isRequired,
  counting: PropTypes.bool.isRequired,
  time: PropTypes.string.isRequired,
};

export default Task;
