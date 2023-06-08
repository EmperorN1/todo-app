import React from "react";
import PropTypes from 'prop-types';
import './task-list.css';

import Task from "../task/task";

const TaskList = ({lists, onDelete, onCompleted}) => {

    const result = lists.map((i) => {

        const { id, ...itemProps } = i;

        return (
            <li key={id}>
                <Task {...itemProps}
                onDelete={() => onDelete(id)}
                onCompleted={() => onCompleted(id)}/>
            </li>
        );
    });

    return (
        <ul className="todo-list">
            {result}
        </ul>
    )
}

TaskList.defaultProps = {
    // lists: [{description: 'ERROR', 
    //         completed: false, 
    //         checked: false, 
    //         time: `Error in loading tasks list`, 
    //         id: 100}],
    onDelete: () => {},
    onCompleted: () => {}
}

TaskList.propTypes = {
    lists: PropTypes.array.isRequired
}

export default TaskList;