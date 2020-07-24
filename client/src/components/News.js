import React, { Component } from 'react';

class News extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { news } = this.props.location.state;
    return (
      <div>
        <h1>News</h1>
        <img src={news[0].thumbnail} alt="News" />
        <h3>{news[0].title}</h3>
        <p>{news[0].content}</p>
      </div>
    );
  }
}

export default News;
