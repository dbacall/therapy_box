import React, { Component } from 'react';
import axios from 'axios';
import '../stylesheets/Tasks.css';
import plus from '../assets/Plus_button_small.png';

class Tasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: this.props.location.state.tasks,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.location.state) {
      if (prevState.tasks !== this.state.tasks) {
        this.saveTasks();
      }
    }
  }

  addTask = () => {
    this.setState({
      tasks: this.state.tasks.concat({
        message: `Task ${this.state.tasks.length + 1}`,
        completed: false,
        id: null,
      }),
    });
  };

  changeTask = (e) => {
    const userId = localStorage.getItem('userId');

    var newTasks = this.state.tasks;
    var index = e.target.id;
    newTasks[index].message = e.target.value;
    this.setState({
      tasks: newTasks,
    });
    var { tasks } = this.state;
    if (tasks[index].userId === userId) {
      this.updateTask(
        tasks[index].message,
        tasks[index].completed,
        tasks[index]._id
      );
    } else {
      this.postTask(tasks[index].message, tasks[index].completed, userId);
    }
  };

  onCheck = (e) => {
    const userId = localStorage.getItem('userId');
    var index = e.target.id;

    var newTasks = this.state.tasks;
    newTasks[e.target.id].completed = !newTasks[e.target.id].completed;
    this.setState({
      tasks: newTasks,
    });
    var { tasks } = this.state;

    if (tasks[index].userId === userId) {
      this.updateTask(
        tasks[index].message,
        tasks[index].completed,
        tasks[index]._id
      );
    } else {
      this.postTask(tasks[index].message, tasks[index].completed, userId);
    }
  };

  saveTasks = () => {
    const userId = localStorage.getItem('userId');
    this.state.tasks.forEach((task, i) => {
      if (task.userId === userId) {
        this.updateTask(task.message, task.completed, task._id);
      } else {
        this.postTask(task.message, task.completed, userId);
      }
    });
  };

  updateTask = (message, completed, taskId) => {
    const taskToUpdate = {
      message: message,
      completed: completed,
    };
    axios
      .post(`http://localhost:5000/tasks/task/${taskId}`, taskToUpdate)
      .then((res) => {
        console.log('Task updated');
      })
      .catch((err) => {
        console.error(err);
      });
  };

  postTask = (message, completed, userId) => {
    const taskToAdd = {
      message: message,
      completed: completed,
      userId: userId,
    };
    axios
      .post('http://localhost:5000/tasks/create', taskToAdd)
      .then((res) => {
        console.log('Tasks Added');
        this.setState({ redirect: true });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  render() {
    const { tasks } = this.state;
    return (
      <div className="tasks-container">
        <h1 className="tasks-title">Tasks</h1>
        <ul className="task-list">
          {tasks.map((task, i) => {
            return (
              <li className="task">
                <input
                  type="text"
                  id={i}
                  value={task.message}
                  onChange={this.changeTask}
                  className="task-input"
                />
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    id={i}
                    onChange={this.onCheck}
                    checked={tasks[i].completed}
                    className="task-checkbox"
                  />
                  <span class="checkmark"></span>
                </label>
              </li>
            );
          })}
        </ul>
        <button onClick={this.addTask} className="add-task-btn">
          <img src={plus} className="plus-icon" alt="plus" />
        </button>
      </div>
    );
  }
}

export default Tasks;
