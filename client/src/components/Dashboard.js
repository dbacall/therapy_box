import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import clouds from '../assets/Clouds_icon.png';
import sun from '../assets/Sun_icon.png';
import rain from '../assets/Rain_icon.png';
import { PieChart } from 'react-minimal-pie-chart';
import ReactLoading from 'react-loading';
import '../stylesheets/Dashboard.css';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      photos: [],
      weather: null,
      news: null,
      clothesData: null,
      team: [],
    };
  }

  componentDidMount() {
    const userId = this.props.location.state.user.id;
    axios
      .get(`http://localhost:5000/tasks/${userId}`)
      .then((res) => {
        this.setState({ tasks: res.data });
      })
      .catch((err) => {
        console.error(err);
      });

    axios
      .get(`http://localhost:5000/photos/${userId}`)
      .then((res) => {
        this.setState({ photos: res.data });
      })
      .catch((err) => {
        console.error(err);
      });

    this.getWeather();

    axios
      .get(
        'https://api.rss2json.com/v1/api.json?rss_url=http://feeds.skynews.com/feeds/rss/home.xml'
      )
      .then((res) => {
        this.setState({
          news: res.data.items,
        });
      });

    axios
      .get(
        'https://cors-anywhere.herokuapp.com/https://therapy-box.co.uk/hackathon/clothing-api.php?username=swapnil'
      )
      .then((res) => {
        var clothes = res.data.payload;
        this.setState({
          clothesData: [
            {
              title: 'Hoodie',
              value: this.getClothesNumber(clothes, 'hoodie'),
              color: 'red',
            },
            {
              title: 'Jumper',
              value: this.getClothesNumber(clothes, 'jumper'),
              color: 'green',
            },
            {
              title: 'Jacket',
              value: this.getClothesNumber(clothes, 'jacket'),
              color: 'yellow',
            },
            {
              title: 'Sweater',
              value: this.getClothesNumber(clothes, 'sweater'),
              color: 'blue',
            },
            {
              title: 'Blazer',
              value: this.getClothesNumber(clothes, 'blazer'),
              color: 'orange',
            },
            {
              title: 'Raincoat',
              value: this.getClothesNumber(clothes, 'raincoat'),
              color: 'purple',
            },
          ],
        });
      });

    axios
      .get(`http://localhost:5000/team/${userId}`)
      .then((res) => {
        this.setState({ team: res.data });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  getWeather = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      axios
        .get(
          `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=d0a10211ea3d36b0a6423a104782130e`
        )
        .then((res) => {
          this.setState({ weather: res.data });
        });
    });
  };

  getClothesNumber = (clothes, itemOfClothing) => {
    return clothes.filter((item) => item.clothe === itemOfClothing).length;
  };

  render() {
    const { weather, news, clothesData, team, tasks, photos } = this.state;
    return (
      <div>
        <h1 className="dashboard-title">
          Good day {this.props.location.state.user.username}
        </h1>
        <div className="profpic-container">
          <img
            src={`http://localhost:5000/${this.props.location.state.user.profilePicture}`}
            alt="Profile Pic"
            className="profpic"
          />
        </div>
        <div className="dashboard-row">
          <div className="dashboard-row-item">
            <h4 className="row-item-banner">Weather</h4>
            {weather ? (
              <>
                {weather.weather[0].main === 'Clouds' ? (
                  <img src={clouds} alt="cloud icon" className="weather-icon" />
                ) : weather.weather[0].main === 'Sun' ? (
                  <img src={sun} alt="sun icon" className="weather-icon" />
                ) : (
                  <img src={rain} alt="rain icon" className="weather-icon" />
                )}

                <div className="weather-temp">{weather.main.temp} degrees</div>
                <div className="weather-location">{weather.name}</div>
              </>
            ) : (
              <ReactLoading
                type={'spin'}
                height={40}
                width={40}
                className="loading"
              />
            )}
          </div>
          <Link
            to={{
              pathname: '/news',
              state: {
                user: this.props.location.state.user,
                news: this.state.news,
              },
            }}
            className="dashboard-row-item"
          >
            <h4 className="row-item-banner">News</h4>
            {news ? (
              <div>
                <h3 className="dashboard-news-headline">{news[0].title}</h3>
                <div className="dashboard-news-img-container">
                  <img
                    src={news[0].thumbnail}
                    alt="News"
                    className="dashboard-news-img"
                  />
                </div>
              </div>
            ) : (
              <ReactLoading
                type={'spin'}
                height={40}
                width={40}
                className="loading"
              />
            )}
          </Link>
          <Link
            className="dashboard-row-item"
            to={{
              pathname: '/sport',
              state: {
                user: this.props.location.state.user,
                team: team,
              },
            }}
          >
            <h4 className="row-item-banner">Sport</h4>
            <p className="team-name">
              {team.length !== 0 ? <h3>{team[0].name}</h3> : null}
            </p>
          </Link>
        </div>
        <div className="dashboard-row-2">
          <Link
            className="dashboard-row-item"
            to={{
              pathname: '/photos',
              state: {
                user: this.props.location.state.user,
                photos: this.state.photos,
              },
            }}
          >
            <h4 className="row-item-banner">Photos</h4>
            <div className="photo-thumbnail-top-left">
              {photos.length > 0 ? (
                <img
                  src={`http://localhost:5000/${photos[0].photo}`}
                  alt="img"
                  className="thumbnail-img"
                />
              ) : null}
            </div>
            <div className="photo-thumbnail-top-right">
              {photos.length > 1 ? (
                <img
                  src={`http://localhost:5000/${photos[1].photo}`}
                  alt="img"
                  className="thumbnail-img"
                />
              ) : null}
            </div>
            <div className="photo-thumbnail-bottom-left">
              {photos.length > 2 ? (
                <img
                  src={`http://localhost:5000/${photos[2].photo}`}
                  alt="img"
                  className="thumbnail-img"
                />
              ) : null}
            </div>
            <div className="photo-thumbnail-bottom-right">
              {photos.length > 3 ? (
                <img
                  src={`http://localhost:5000/${photos[3].photo}`}
                  alt="img"
                  className="thumbnail-img"
                />
              ) : null}
            </div>
          </Link>
          <Link
            className="dashboard-row-item"
            to={{
              pathname: '/tasks',
              state: {
                user: this.props.location.state.user,
                tasks: this.state.tasks,
              },
            }}
          >
            <h4 className="row-item-banner">Tasks</h4>
            <ul className="dashboard-task-list">
              {tasks.slice(0, 3).map((task, i) => {
                return (
                  <li>
                    <input
                      type="text"
                      id={i}
                      value={task.message}
                      onChange={this.changeTask}
                      disabled
                      className="dashboard-task"
                    />
                    <label className="dashboard-checkbox-container">
                      <input
                        type="checkbox"
                        id={i}
                        onChange={this.onCheck}
                        checked={tasks[i].completed}
                        disabled
                        className="dashboard-task-checkbox"
                      />
                      <span class="dashboard-checkmark"></span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </Link>
          <div className="dashboard-row-item">
            <h4 className="row-item-banner">Clothes</h4>
            {clothesData ? (
              <PieChart
                data={clothesData}
                radius={35}
                label={({ dataEntry }) =>
                  `${dataEntry.title}: \n${Math.round(dataEntry.percentage)}%`
                }
                labelStyle={{
                  fontSize: '3px',
                  color: 'white',
                }}
                color="white"
                className="pie-chart"
              />
            ) : (
              <ReactLoading
                type={'spin'}
                height={40}
                width={40}
                className="loading"
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
