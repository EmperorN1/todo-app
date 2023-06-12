import React from 'react';
import PropTypes from 'prop-types';
import './tasks-filter.css';
import '../index.css';

export default class TasksFilter extends React.Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    selected: PropTypes.bool.isRequired,
  };

  render() {
    const { text, selected, selectButton } = this.props;
    let className = ' ';

    if (selected) {
      className += ' selected';
    }

    return (
      <button className={className} onClick={selectButton}>
        {text}
      </button>
    );
  }
}
