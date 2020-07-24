import React, { Component } from 'react';
import axios from 'axios';

class Tasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: this.props.location.state.tasks,
    };
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
    var newTasks = this.state.tasks;
    newTasks[e.target.id].message = e.target.value;
    this.setState({
      tasks: newTasks,
    });
  };

  onCheck = (e) => {
    var newTasks = this.state.tasks;
    newTasks[e.target.id].completed = !newTasks[e.target.id].completed;
    this.setState({
      tasks: newTasks,
    });
  };

  saveTasks = () => {
    const userId = this.props.location.state.user.id;
    this.state.tasks.forEach((task, i) => {
      if (task.userId === userId) {
        const taskToUpdate = {
          message: task.message,
          completed: task.completed,
        };
        axios
          .post(`http://localhost:5000/tasks/task/${task._id}`, taskToUpdate)
          .then((res) => {
            console.log('Task updated');
          })
          .catch((err) => {
            console.error(err);
          });
      } else {
        const taskToAdd = {
          message: task.message,
          completed: task.completed,
          userId: userId,
        };
        axios
          .post('http://localhost:5000/tasks/create', taskToAdd)
          .then((res) => {
            console.log('Tasks Added');
          })
          .catch((err) => {
            console.error(err);
          });
      }
    });
  };

  render() {
    const { tasks } = this.state;
    return (
      <div>
        <h1>Tasks</h1>
        <ul>
          {tasks.map((task, i) => {
            return (
              <li>
                <input
                  type="text"
                  id={i}
                  value={task.message}
                  onChange={this.changeTask}
                />
                <input
                  type="checkbox"
                  id={i}
                  onChange={this.onCheck}
                  checked={tasks[i].completed}
                />
              </li>
            );
          })}
        </ul>
        <button onClick={this.addTask}>+</button>
        <button onClick={this.saveTasks}>Save</button>
      </div>
    );
  }
}

export default Tasks;
