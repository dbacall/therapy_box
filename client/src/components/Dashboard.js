import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const userId = this.props.location.state.user.id;
    console.log(userId);
    axios
      .get(`http://localhost:5000/tasks/${userId}`)
      .then((res) => {
        console.log(res);
        this.setState({ tasks: res.data });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    return (
      <div>
        <h1>Good day {this.props.location.state.user.username}</h1>
        <img
          src={`http://localhost:5000/${this.props.location.state.user.profilePicture}`}
          alt="Profile Picture"
          height="200"
        />
        <Link
          to={{
            pathname: '/tasks',
            state: {
              userId: this.props.location.state.user.id,
              tasks: this.state.tasks,
            },
          }}
        >
          Tasks
        </Link>
      </div>
    );
  }
}

export default Dashboard;
