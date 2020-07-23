import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Dashboard extends Component {
  state = {};
  render() {
    return (
      <div>
        <h1>Good day {this.props.location.state.user.username}</h1>
        <img
          src={`http://localhost:5000/${this.props.location.state.user.profilePicture}`}
          alt="Profile Picture"
          height="200"
        />
        <Link to={'/tasks'}>Tasks</Link>
      </div>
    );
  }
}

export default Dashboard;
