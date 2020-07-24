import React, { Component } from 'react';
import { csv } from 'd3';
import sportsData from '../assets/I1.csv';

class Sport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      team: '',
      beatenTeams: null,
    };
  }

  componentDidMount() {
    csv(sportsData).then((res) => {
      this.setState({ data: res });
    });
  }

  onChange = (e) => {
    this.setState({ team: e.target.value });
  };

  onSubmit = (e) => {
    const { team } = this.state;
    e.preventDefault();
    var beatenTeams = this.state.data;
    this.setState({
      beatenTeams: beatenTeams
        .filter((game) => {
          return (
            (game.HomeTeam === team && game.FTHG > game.FTAG) ||
            (game.AwayTeam === team && game.FTAG > game.FTHG)
          );
        })
        .map((game) => {
          if (game.HomeTeam === team) {
            return game.AwayTeam;
          } else {
            return game.HomeTeam;
          }
        }),
    });
  };

  render() {
    const { data, beatenTeams } = this.state;
    return (
      <div>
        <h1>Champions League Challenge</h1>
        {data ? (
          <form onSubmit={this.onSubmit}>
            <input
              type="text"
              placeholder="Input your team here..."
              value={this.state.team}
              onChange={this.onChange}
            />
            <input type="submit" value="Submit" />
          </form>
        ) : null}
        {beatenTeams ? (
          <ul>
            {beatenTeams.map((team) => {
              return <li>{team}</li>;
            })}
          </ul>
        ) : null}
      </div>
    );
  }
}

export default Sport;
