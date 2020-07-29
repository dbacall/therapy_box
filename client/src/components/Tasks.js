import React, { Component } from 'react';
import axios from 'axios';
import '../stylesheets/Tasks.css';
import plus from '../assets/Plus_button_small.png';
import { config } from '../constants';

const url = config.url.API_URL;

class Tasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: this.props.location.state.tasks,
      newTaskAdded: false,
    };
  }

  addTask = () => {
    const userId = localStorage.getItem('userId');

    this.postTask(`Task ${this.state.tasks.length + 1}`, false, userId);
    this.getTasks(userId);
  };

  changeTask = (e) => {
    var newTasks = this.state.tasks;
    var index = e.target.id;
    newTasks[index].message = e.target.value;
    this.setState({
      tasks: newTasks,
    });
    var { tasks } = this.state;
    this.updateTask(
      tasks[index].message,
      tasks[index].completed,
      tasks[index]._id
    );
  };

  onCheck = (e) => {
    var index = e.target.id;

    var newTasks = this.state.tasks;
    newTasks[e.target.id].completed = !newTasks[e.target.id].completed;
    this.setState({
      tasks: newTasks,
    });
    var { tasks } = this.state;

    this.updateTask(
      tasks[index].message,
      tasks[index].completed,
      tasks[index]._id
    );
  };

  componentDidUpdate(prevProps, prevState) {
    const userId = localStorage.getItem('userId');

    if (this.state.newTaskAdded) {
      this.getTasks(userId);
      this.setState({ newTaskAdded: false });
    }
  }

  getTasks = (userId) => {
    axios
      .get(`${url}/tasks/${userId}`)
      .then((res) => {
        this.setState({ tasks: res.data });
      })
      .catch((err) => {
        console.error(err);
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
