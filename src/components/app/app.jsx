import React, { useState } from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { v4 as uuidv4 } from 'uuid';
import './app.css';

import NewTaskForm from '../new-task-form';
import TaskList from '../task-list';
import Footer from '../footer';

let timerLink = new Object(); // данная переменная используется для хранения ссылок на setInterval, дабы очищать их в дальнейшем

const App = () => {
  console.log('updated');

  const createListitem = (text, time, seconds) => {
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
  };

  const [lists, setLists] = useState([
    createListitem('Task 1', new Date('2023-07-05 21:00'), '1800'),
    createListitem('Task 2', new Date('2023-08-05 21:30'), '2700'),
    createListitem('Task 3', new Date('2023-09-05 21:45'), '3600'),
  ]);
  const [buttons, setButtons] = useState([
    { text: 'All', selected: true, id: 1, filter: 'all' },
    { text: 'Active', selected: false, id: 2, filter: false },
    { text: 'Completed', selected: false, id: 3, filter: true },
  ]);
  const [buttonFilter, setButtonFilter] = useState('all');
  const completedTasks = lists.length - lists.filter((i) => i.completed).length;

  const toggleProperty = (arr, id, firstProp) => {
    const idx = arr.findIndex((el) => el.id === id),
      oldItem = arr[idx],
      newItem = { ...oldItem, [firstProp]: !oldItem[firstProp] };
    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  };

  const decreaseTime = (arr, id) => {
    const idx = arr.findIndex((el) => el.id === id),
      oldItem = arr[idx],
      newItem = { ...oldItem, time: `${oldItem.time - 1}` };
    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  };

  const selectButton = (arr, id, propName) => {
    const idx = arr.findIndex((el) => el.id === id),
      oldItem = arr[idx],
      newArr = arr.map((i) => {
        return { ...i, [propName]: false };
      }),
      newItem = { ...oldItem, [propName]: true };
    setButtons([...newArr.slice(0, idx), newItem, ...newArr.slice(idx + 1)]);
    setButtonFilter(newItem.filter);
  };

  const onFiltered = (arr, filter) => {
    if (filter === 'all') {
      return arr;
    } else {
      return arr.filter((i) => i.completed === filter);
    }
  };

  const onAdd = (text, time) => {
    setLists((lists) => {
      return [...lists, createListitem(text, new Date(), time)];
    });
  };

  const onDelete = (id) => {
    countDown('stop', id, true);
    setLists((lists) => {
      return lists.filter((el) => el.id !== id);
    });
  };

  const onClear = () => {
    setLists((lists) => {
      return lists.filter((el) => !el.completed);
    });
  };

  const onEdit = (id) => {
    setLists((lists) => {
      return toggleProperty(lists, id, 'edited');
    });
  };

  const completeEditing = (newText, id) => {
    setLists((lists) => {
      return lists.map((item) => {
        if (item.id === id) {
          item.description = newText;
        }
        return item;
      });
    });
    onEdit(id);
  };

  const onCompleted = (id) => {
    setLists((lists) => {
      return toggleProperty(lists, id, 'checked');
    });
    setLists((lists) => {
      return toggleProperty(lists, id, 'completed');
    });
  };

  const countDown = (arg, id, counting, time) => {
    if (arg == 'start' && !counting && time != 0) {
      setLists((lists) => {
        return toggleProperty(lists, id, 'counting');
      });
      timerLink[id] = setInterval(() => {
        time -= 1;
        setLists((lists) => {
          return decreaseTime(lists, id);
        });
        if (time == 0) {
          clearInterval(timerLink[id]);
          alert('Task is timed out');
          setLists((lists) => {
            return toggleProperty(lists, id, 'counting');
          });
        }
      }, 1000);
    } else if (arg == 'stop' && counting) {
      console.log('stop');
      clearInterval(timerLink[id]);
      setLists((lists) => {
        return toggleProperty(lists, id, 'counting');
      });
    }
  };

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm onAdd={onAdd} />
      </header>
      <section className="main">
        <TaskList
          lists={onFiltered(lists, buttonFilter)}
          onDelete={onDelete}
          onCompleted={onCompleted}
          onEdit={onEdit}
          completeEditing={completeEditing}
          countDown={countDown}
        />
        <Footer lists={lists} count={completedTasks} buttons={buttons} selectButton={selectButton} onClear={onClear} />
      </section>
    </div>
  );
};

export default App;
