import React from 'react';
import PropTypes from 'prop-types';
import './footer.css';
import '../index.css';

import TasksFilter from '../tasks-filter/tasks-filter';

const Footer = ({ count, buttons, selectButton, onClear }) => {
  const buttonsArr = buttons.map((i) => {
    const { id, ...items } = i;

    return (
      <li key={id}>
        <TasksFilter {...items} selectButton={() => selectButton(buttons, id, 'selected')} />
      </li>
    );
  });

  return (
    <footer className="footer">
      <span className="todo-count">{count} items left</span>
      <ul className="filters">{buttonsArr}</ul>
      <button className="clear-completed" onClick={onClear}>
        Clear completed
      </button>
    </footer>
  );
};

Footer.defaultProps = {
  // lists: [{description: 'ERROR',
  //         completed: false,
  //         checked: false,
  //         time: `Error in loading tasks list`,
  //         id: 100}],
  // buttons: [{text: "All", selected: true, id: 1, filter: "all"}],
  // count: "Unknown",
  selectButton: () => {
    throw new Error('There is an Error in filtering');
  },
  onClear: () => {
    throw new Error('There is an Error in clear completed tasks');
  },
};

Footer.propTypes = {
  lists: PropTypes.array.isRequired,
  buttons: PropTypes.array.isRequired,
  count: PropTypes.number.isRequired,
};

export default Footer;
