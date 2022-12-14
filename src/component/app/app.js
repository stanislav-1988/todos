import InputPanel from '../new-task-form';
import FooterInformation from '../footer';
import TaskList from '../task-list';
import React from 'react';

import './app.css';

export default class ConstructionDOM extends React.Component {
  styleButFilter = 1;

  numId = 1;

  state = {
    todoArr: [this.addTask('Создайте задачу')],
  };

  completedTask = (str) => {
    this.setState(({ todoArr }) => {
      const newArr = [...todoArr.slice(0)];
      const indexEl = newArr.findIndex((el) => el.id === str);
      const element = newArr[indexEl];
      element.important = !element.important;

      return { todoArr: newArr };
    });
  };

  delElement = (str) => {
    this.setState(({ todoArr }) => {
      const indexEl = todoArr.findIndex((el) => el.id === str);
      const newArr = [...todoArr.slice(0, indexEl), ...todoArr.slice(indexEl + 1)];
      return { todoArr: newArr };
    });
  };

  deletingAllCompleted = () => {
    this.setState(({ todoArr }) => {
      const copyArr = [...todoArr];
      const newArr = copyArr.filter((el) => !el.important);

      return { todoArr: newArr };
    });
  };

  allTasksFilter = () => {
    this.styleButFilter = 1;
    this.setState(({ todoArr }) => {
      const newArr = [...todoArr];
      newArr.forEach((el) => {
        // eslint-disable-next-line no-param-reassign
        el.done = false;
      });

      return { todoArr: newArr };
    });
  };

  activeTasksFilter = () => {
    this.allTasksFilter();
    this.styleButFilter = 2;
    this.setState(({ todoArr }) => {
      const newArr = [...todoArr];
      newArr.forEach((el) => {
        if (el.important) {
          // eslint-disable-next-line no-param-reassign
          el.done = true;
        }
      });
      return { todoArr: newArr };
    });
  };

  completedTasksFilter = () => {
    this.allTasksFilter();
    this.styleButFilter = 3;
    this.setState(({ todoArr }) => {
      const newArr = [...todoArr];
      newArr.forEach((el) => {
        if (!el.important) {
          // eslint-disable-next-line no-param-reassign
          el.done = true;
        }
      });
      return { todoArr: newArr };
    });
  };

  addTaskOfForm = (n) => {
    this.setState(({ todoArr }) => {
      const newArr = [...todoArr];
      newArr.push(this.addTask(n));
      return {
        todoArr: newArr,
      };
    });
  };

  editingTaskBut = (str) => {
    this.setState(({ todoArr }) => {
      const indexEl = todoArr.findIndex((el) => el.id === str);
      const newArr = [...todoArr];
      newArr[indexEl].editingTask = !newArr[indexEl].editingTask;
      return { todoArr: newArr };
    });
  };

  newTextTask = (props) => {
    const { label, id } = props;
    this.setState(({ todoArr }) => {
      const indexEl = todoArr.findIndex((el) => el.id === id);
      const newArr = [...todoArr];
      newArr[indexEl].lab = label;
      newArr[indexEl].editingTask = !newArr[indexEl].editingTask;
      return { todoArr: newArr };
    });
  };

  addTask(str) {
    const ad = this.numId;
    // eslint-disable-next-line no-plusplus
    this.numId++;
    return {
      editingTask: false,
      timeСreation: new Date(),
      lab: str,
      important: false,
      done: false,
      id: ad,
    };
  }

  render() {
    const { todoArr } = this.state;
    const restOfTasks = todoArr.filter((el) => !el.important).length;

    return (
      <div>
        <InputPanel addTaskOfForm={this.addTaskOfForm} />
        <TaskList
          onSubmit={this.allTasksFilter}
          editingTaskBut={this.editingTaskBut}
          delEl={this.delElement}
          completedTask={this.completedTask}
          todos={todoArr}
          newTextTask={this.newTextTask}
        />
        <FooterInformation
          restOfTasks={restOfTasks}
          deletingAllCompleted={this.deletingAllCompleted}
          allTasksFilter={this.allTasksFilter}
          activeTasksFilter={this.activeTasksFilter}
          completedTasksFilter={this.completedTasksFilter}
          styleButFilter={this.styleButFilter}
        />
      </div>
    );
  }
}
