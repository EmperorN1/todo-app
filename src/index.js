import React from 'react';
import ReactDOM from 'react-dom/client';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import './index.css';

import NewTaskForm from './new-task-form/new-task-form';
import TaskList from './task-list/task-list';
import Footer from './footer/footer';

class App extends React.Component {
  idCounter = 100;

  state = {
    lists: [
      this.createListitem('Completed task', new Date('2023-06-03 21:00')),
      this.createListitem('Editing task', new Date('2023-06-04 21:30')),
      this.createListitem('Active task', new Date('2023-06-05 21:45')),
    ],
    buttons: [
      { text: 'All', selected: true, id: 1, filter: 'all' },
      { text: 'Active', selected: false, id: 2, filter: false },
      { text: 'Completed', selected: false, id: 3, filter: true },
    ],
    buttonFilter: 'all',
  };

  createListitem(text, time) {
    return {
      description: text,
      completed: false,
      checked: false,
      edited: false,
      time: `Created ${formatDistanceToNow(time, { includeSeconds: true })} ago`,
      id: this.idCounter++,
    };
  }

  toggleProperty = (arr, id, firstProp) => {
    const idx = arr.findIndex((el) => el.id === id),
      oldItem = arr[idx],
      newItem = { ...oldItem, [firstProp]: !oldItem[firstProp] };
    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  };

  selectButton = (arr, id, propName) => {
    const idx = arr.findIndex((el) => el.id === id),
      oldItem = arr[idx],
      newArr = arr.map((i) => {
        return { ...i, [propName]: false };
      }),
      newItem = { ...oldItem, [propName]: true };
    this.setState(() => {
      return {
        buttons: [...newArr.slice(0, idx), newItem, ...newArr.slice(idx + 1)],
        buttonFilter: newItem.filter,
      };
    });
  };

  onFiltered = (arr, filter) => {
    if (filter === 'all') {
      return arr;
    } else {
      return arr.filter((i) => i.completed === filter);
    }
  };

  onAdd = (text) => {
    this.setState(({ lists }) => {
      const newList = [...lists, this.createListitem(text, new Date())];
      return {
        lists: newList,
      };
    });
  };

  onDelete = (id) => {
    this.setState(({ lists }) => {
      const newArr = lists.filter((el) => el.id !== id);
      return {
        lists: newArr,
      };
    });
  };

  onClear = () => {
    this.setState(({ lists }) => {
      const newArr = lists.filter((el) => !el.completed);
      return {
        lists: newArr,
      };
    });
  };

  onEdit = (id) => {
    this.setState(({ lists }) => {
      return {
        lists: this.toggleProperty(lists, id, 'edited'),
      };
    });
  };

  completeEditing = (newText, id) => {
    this.setState(({ lists }) => {
      const newList = lists.map((item) => {
        if (item.id === id) {
          item.description = newText;
        }
        return item;
      });
      return {
        lists: newList,
      };
    });
    this.onEdit(id);
  };

  onCompleted = (id) => {
    this.setState(({ lists }) => {
      return {
        lists: this.toggleProperty(lists, id, 'completed'),
      };
    });
    this.setState(({ lists }) => {
      return {
        lists: this.toggleProperty(lists, id, 'checked'),
      };
    });
  };

  render() {
    const { lists, buttons, buttonFilter } = this.state;
    const completedTasks = lists.length - lists.filter((i) => i.completed).length;

    return (
      <div className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm onAdd={this.onAdd} />
        </header>
        <section className="main">
          <TaskList
            lists={this.onFiltered(lists, buttonFilter)}
            onDelete={this.onDelete}
            onCompleted={this.onCompleted}
            onEdit={this.onEdit}
            completeEditing={this.completeEditing}
          />
          <Footer
            lists={lists}
            count={completedTasks}
            buttons={buttons}
            selectButton={this.selectButton}
            onClear={this.onClear}
          />
        </section>
      </div>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
