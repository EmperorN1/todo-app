import React from 'react';
import PropTypes from 'prop-types';
import './task-list.css';

import Task from '../task/task';

const TaskList = ({ lists, onDelete, onCompleted, onEdit, completeEditing, countDown }) => {
  const result = lists.map((i) => {
    return (
      <li key={i.id}>
        <Task
          {...i}
          onDelete={() => onDelete(i.id)}
          onCompleted={() => onCompleted(i.id)}
          onEdit={() => onEdit(i.id)}
          onStart={() => countDown('start', i.id, i.counting, i.time)}
          onStop={() => countDown('stop', i.id, i.counting, i.time)}
          completeEditing={completeEditing}
        />
      </li>
    );
  });

  return <ul className="todo-list">{result}</ul>;
};

TaskList.defaultProps = {
  // lists: [{description: 'ERROR',
  //         completed: false,
  //         checked: false,
  //         time: `Error in loading tasks list`,
  //         id: 100}],
  onDelete: () => {
    throw new Error('There is an Error in deletgng task');
  },
  onCompleted: () => {
    throw new Error('There is an Error in marking task as completed');
  },
  onEdit: () => {
    throw new Error('There is an Error in editing task');
  },
  completeEditing: () => {
    throw new Error('There is an Error in editing task');
  },
};

TaskList.propTypes = {
  lists: PropTypes.array.isRequired,
};

export default TaskList;
