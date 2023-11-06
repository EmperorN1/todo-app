import React from 'react';
import PropTypes from 'prop-types';
import './tasks-filter.css';

const TasksFilter = ({ text, selected, selectButton }) => {
  let className = ' ';

  if (selected) {
    className += ' selected';
  }

  return (
    <button className={className} onClick={selectButton}>
      {text}
    </button>
  );
};

export default TasksFilter;

TasksFilter.propTypes = {
  text: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
};
