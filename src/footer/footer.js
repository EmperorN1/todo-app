import React from "react";
import PropTypes from 'prop-types';
import './footer.css';
import '../index.css';

import TasksFilter from "../tasks-filter/tasks-filter";

const Footer = ({lists, count, buttons, onFiltered, onClear}) => {

    const buttonsArr = buttons.map((i) => {
        const {id, filter, ...items} = i;

        return (
            <li key={id}>
                <TasksFilter {...items}
                             onFiltered={() => onFiltered(lists, filter, id)}/>
            </li>
        )
    })

    return (
        <footer className="footer">
            <span className="todo-count">{count} items left</span>
            <ul className="filters">
                {buttonsArr}
            </ul>
            <button className="clear-completed" onClick={onClear}>Clear completed</button>
        </footer>
    )
}

Footer.defaultProps = {
    // lists: [{description: 'ERROR', 
    //         completed: false, 
    //         checked: false, 
    //         time: `Error in loading tasks list`, 
    //         id: 100}],
    // buttons: [{text: "All", selected: true, id: 1, filter: "all"}],
    // count: "Unknown",
    onFiltered: () => {
        return new Error("There's an Error in filtering")
    },
    onClear: () => {
        return new Error("There's an Error in filtering")
    }
}

Footer.propTypes = {
    lists: PropTypes.array.isRequired,
    buttons: PropTypes.array.isRequired,
    count: PropTypes.number.isRequired
}

export default Footer;