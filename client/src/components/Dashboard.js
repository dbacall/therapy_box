import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import clouds from '../assets/Clouds_icon.png';
import sun from '../assets/Sun_icon.png';
import rain from '../assets/Rain_icon.png';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      photos: [],
      weather: null,
      news: null,
    };
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

    axios
      .get(`http://localhost:5000/photos/${userId}`)
      .then((res) => {
        console.log(res);
        this.setState({ photos: res.data });
      })
      .catch((err) => {
        console.error(err);
      });

    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      axios
        .get(
          `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=d0a10211ea3d36b0a6423a104782130e`
        )
        .then((res) => {
          // console.log(res.data);
          this.setState({ weather: res.data });
        });
    });

    axios
      .get(
        'https://api.rss2json.com/v1/api.json?rss_url=http://feeds.skynews.com/feeds/rss/home.xml'
      )
      .then((res) => {
        console.log(res);
        this.setState({
          news: res.data.items,
        });
      });
  }

  render() {
    const { weather, news } = this.state;
    return (
      <div>
        <h1>Good day {this.props.location.state.user.username}</h1>
        <img
          src={`http://localhost:5000/${this.props.location.state.user.profilePicture}`}
          alt="Profile Picture"
          height="200"
        />
        <div>
          {weather ? (
            <div>
              {weather.weather[0].main === 'Clouds' ? (
                <img src={clouds} />
              ) : weather.weather[0].main === 'Sun' ? (
                <img src={sun} />
              ) : (
                <img src={rain} />
              )}

              <span>{weather.main.temp} degrees</span>
              <div>{weather.name}</div>
            </div>
          ) : null}
        </div>
        <Link
          to={{
            pathname: '/news',
            state: {
              user: this.props.location.state.user,
              news: this.state.news,
            },
          }}
        >
          {news ? (
            <div>
              <h3>{news[0].title}</h3>
              <img src={news[0].thumbnail} />
            </div>
          ) : null}
        </Link>
        <Link
          to={{
            pathname: '/tasks',
            state: {
              user: this.props.location.state.user,
              tasks: this.state.tasks,
            },
          }}
        >
          Tasks
        </Link>
        <Link
          to={{
            pathname: '/photos',
            state: {
              user: this.props.location.state.user,
              photos: this.state.photos,
            },
          }}
        >
          Photos
        </Link>
      </div>
    );
  }
}

export default Dashboard;
