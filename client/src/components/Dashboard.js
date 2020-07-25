import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import clouds from '../assets/Clouds_icon.png';
import sun from '../assets/Sun_icon.png';
import rain from '../assets/Rain_icon.png';
import { PieChart } from 'react-minimal-pie-chart';

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
    const { weather, news, clothesData, team } = this.state;
    return (
      <div>
        <h1>Good day {this.props.location.state.user.username}</h1>
        <img
          src={`http://localhost:5000/${this.props.location.state.user.profilePicture}`}
          alt="Profile Pic"
          height="200"
        />
        <div>
          {weather ? (
            <div>
              {weather.weather[0].main === 'Clouds' ? (
                <img src={clouds} alt="cloud icon" />
              ) : weather.weather[0].main === 'Sun' ? (
                <img src={sun} alt="sun icon" />
              ) : (
                <img src={rain} alt="rain icon" />
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
              <img src={news[0].thumbnail} alt="News" />
            </div>
          ) : null}
        </Link>
        <div>
          <Link
            to={{
              pathname: '/sport',
              state: {
                user: this.props.location.state.user,
                team: team,
              },
            }}
          >
            Sport
            {team.length !== 0 ? <h3>{team[0].name}</h3> : null}
          </Link>
        </div>
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
        {clothesData ? (
          <PieChart
            data={clothesData}
            radius={20}
            label={({ dataEntry }) =>
              `${dataEntry.title}: ${Math.round(dataEntry.percentage)}%`
            }
            labelStyle={{
              fontSize: '1.5px',
            }}
          />
        ) : null}
      </div>
    );
  }
}

export default Dashboard;
