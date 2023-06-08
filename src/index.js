import React from 'react';
import ReactDOM from 'react-dom/client';
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import './index.css';

import NewTaskForm from './new-task-form/new-task-form';
import TaskList from './task-list/task-list';
import Footer from './footer/footer';

class App extends React.Component {

  idCounter = 100;

  state = {
    lists: [
      this.createListitem("Completed task", new Date('2023-06-01 21:00')),
      this.createListitem("Editing task", new Date('2023-06-01 21:30')),
      this.createListitem("Active task", new Date('2023-06-01 21:45'))
    ],
    buttons: [
      {text: "All", selected: true, id: 1, filter: "all"},
      {text: "Active", selected: false, id: 2, filter: false},
      {text: "Completed", selected: false, id: 3, filter: true}
    ],
    filteredList: [],
    buttonId: 1,
    buttonFilter: 'all'
  }

  createListitem(text, time) {
    return {description: text, 
            completed: false, 
            checked: false, 
            time: `Created ${formatDistanceToNow(time, { includeSeconds : true })} ago`, 
            id: this.idCounter++}
  }

  toggleProperty = (arr, id, firstProp, secondProp) => {
    const idx = arr.findIndex((el) => el.id === id)
    const oldItem = arr[idx]

    const newItem = {...oldItem, [firstProp]: !oldItem[firstProp], [secondProp]: !oldItem[secondProp]}
    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)]
  }

  selectProperty = (arr, id, propName) => {
    const idx = arr.findIndex((el) => el.id === id)
    const oldItem = arr[idx]

    const newArr = arr.map((i) => {
      return {...i, [propName]: false}
    })
    const newItem = {...oldItem, [propName]: true}
    return [...newArr.slice(0, idx), newItem, ...newArr.slice(idx + 1)]
  }

  onAdd = (text) => {
    this.setState(({lists}) => {
      const newList = [...lists, this.createListitem(text, new Date())]
      return {
        lists: newList
      }
    })
  }

  onDelete = (id) => {
    this.setState(({lists}) => {
      const newArr = lists.filter(el => el.id !== id)
      return {
        lists: newArr
      }
    })
  }

  onClear = () => {
    this.setState(({lists}) => {
      const newArr = lists.filter(el => !el.completed)
      return {
        lists: newArr
      }
    })
  }

  onCompleted = (id) => {
    this.setState(({lists}) => {
      return {
        lists: this.toggleProperty(lists, id, 'completed', 'checked')
      }
    })
  }

  onFiltered = (arr, filter, id) => {
    let filteredArr = []

    this.setState(({buttons}) => {
      if (filter === 'all') {filteredArr = arr}
      else {filteredArr = arr.filter((i) => i.completed === filter)}
      return {
        filteredList: filteredArr,
        buttons: this.selectProperty(buttons, id, "selected"),
        buttonId: id,
        buttonFilter: filter
      }
    })
  }

  componentDidMount() {
    this.onFiltered(this.state.lists, this.state.buttonFilter , this.state.buttonId)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.lists !== this.state.lists) {
      this.onFiltered(this.state.lists, this.state.buttonFilter , this.state.buttonId)
    }
  }

  render() {
    const {lists, buttons, filteredList} = this.state
    const completedTasks = lists.length - lists.filter((i) => i.completed).length

    return (
      <div className='todoapp'>
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm onAdd={this.onAdd}/>
        </header>
        <section className='main'>
          <TaskList lists={filteredList} 
                    onDelete={this.onDelete} 
                    onCompleted={this.onCompleted}/>
          <Footer lists={lists} 
                  count={completedTasks} 
                  buttons={buttons} 
                  onFiltered={this.onFiltered}
                  onClear={this.onClear}/>
        </section>
      </div>
    )
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);