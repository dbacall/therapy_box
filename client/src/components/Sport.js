import React, { Component } from 'react';
import { csv } from 'd3';
import sportsData from '../assets/I1.csv';

class Sport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };
  }

  componentDidMount() {
    csv(sportsData).then((res) => {
      this.setState({ data: res });
    });
  }

  render() {
    return (
      <div>
        <h1>Champions League Challenge</h1>
      </div>
    );
  }
}

export default Sport;
