import React from "react";
import PropTypes from 'prop-types';
import './task.css';
import '../index.css';

export default class Task extends React.Component {

    static defaultProps = {
        // description: 'ERROR', 
        // completed: false, 
        // checked: false, 
        // time: `Error in loading tasks list`,
        onDelete: () => {},
        onCompleted: () => {}
    }

    static propTypes = {
        description: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired,
        checked: PropTypes.bool.isRequired,
        time: PropTypes.string.isRequired
    }

    render() {
        const {description, time, onDelete, onCompleted, completed, checked} = this.props

        let className = 'view'
        if (completed) {className += " completed"}

    return (
        <span className={className}>
            <div className="view">
                <input className="toggle" type="checkbox" defaultChecked={checked} onChange={onCompleted}/>
                <label>
                    <span className="description">{description}</span>
                    <span className="created">{time}</span>
                </label>
                <button className="icon icon-edit"></button>
                <button className="icon icon-destroy" onClick={onDelete}></button>
            </div>
            <input type="text" className="edit" defaultValue={description}></input>
        </span>
    )
    }
}