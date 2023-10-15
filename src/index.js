import React from 'react';
import ReactDOM from 'react-dom/client';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { v4 as uuidv4 } from 'uuid';
import './index.css';

import NewTaskForm from './new-task-form/new-task-form';
import TaskList from './task-list/task-list';
import Footer from './footer/footer';

class App extends React.Component {
  timerLink = {};

  state = {
    lists: [
      this.createListitem('Task 1', new Date('2023-07-05 21:00'), '1800'),
      this.createListitem('Task 2', new Date('2023-08-05 21:30'), '2700'),
      this.createListitem('Task 3', new Date('2023-09-05 21:45'), '3600'),
    ],
    buttons: [
      { text: 'All', selected: true, id: 1, filter: 'all' },
      { text: 'Active', selected: false, id: 2, filter: false },
      { text: 'Completed', selected: false, id: 3, filter: true },
    ],
    buttonFilter: 'all',
  };

  createListitem(text, time, seconds) {
    return {
      description: text,
      completed: false,
      checked: false,
      edited: false,
      create: `Created ${formatDistanceToNow(time, { includeSeconds: true })} ago`,
      time: `${seconds}`,
      counting: false,
      id: uuidv4(),
    };
  }

  toggleProperty = (arr, id, firstProp) => {
    const idx = arr.findIndex((el) => el.id === id),
      oldItem = arr[idx],
      newItem = { ...oldItem, [firstProp]: !oldItem[firstProp] };
    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  };

  decreaseTime = (arr, id) => {
    const idx = arr.findIndex((el) => el.id === id),
      oldItem = arr[idx],
      newItem = { ...oldItem, time: `${oldItem.time - 1}` };
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

  onAdd = (text, time) => {
    this.setState(({ lists }) => {
      const newList = [...lists, this.createListitem(text, new Date(), time)];
      return {
        lists: newList,
      };
    });
  };

  onDelete = (id) => {
    this.countDown('stop', id, true);
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
        lists: this.toggleProperty(lists, id, 'checked'),
      };
    });
    this.setState(({ lists }) => {
      return {
        lists: this.toggleProperty(lists, id, 'completed'),
      };
    });
  };

  countDown = (arg, id, counting, time) => {
    if (arg == 'start' && !counting && time != 0) {
      this.setState(({ lists }) => {
        return {
          lists: this.toggleProperty(lists, id, 'counting'),
        };
      });
      this.timerLink[id] = setInterval(() => {
        time -= 1;
        this.setState(({ lists }) => {
          return {
            lists: this.decreaseTime(lists, id),
          };
        });
        if (time == 0) {
          clearInterval(this.timerLink[id]);
          alert('Task is timed out');
          this.setState(({ lists }) => {
            return {
              lists: this.toggleProperty(lists, id, 'counting'),
            };
          });
        }
      }, 1000);
    } else if (arg == 'stop' && counting) {
      clearInterval(this.timerLink[id]);
      this.setState(({ lists }) => {
        return {
          lists: this.toggleProperty(lists, id, 'counting'),
        };
      });
    }
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
            countDown={this.countDown}
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
