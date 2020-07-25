import React, { Component } from 'react';
import '../stylesheets/News.css';

class News extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { news } = this.props.location.state;
    return (
      <div className="news-container">
        <h1 className="news-title">News</h1>
        <div className="news-img-container">
          <img src={news[0].thumbnail} alt="News" className="news-img" />
        </div>
        <h3 className="news-headline">{news[0].title}</h3>
        <p className="news-content">{news[0].content}</p>
      </div>
    );
  }
}

export default News;
