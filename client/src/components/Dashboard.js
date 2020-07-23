import React, { Component } from 'react';

class Dashboard extends Component {
  state = {};
  render() {
    return (
      <div>
        <h1>Good day {this.props.location.state.user.username}</h1>
      </div>
    );
  }
}

export default Dashboard;
