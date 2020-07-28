import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { csv } from 'd3';
import sportsData from '../assets/I1.csv';
import axios from 'axios';
import '../stylesheets/Sport.css';
import { config } from '../constants';

const url = config.url.API_URL;

function Sport(props) {
  const [data, setData] = useState(null);
  const [newTeam, setNewTeam] = useState(null);
  const [oldTeam, setOldTeam] = useState(null);
  const [beatenTeams, setBeatenTeams] = useState(null);
  const [teamLoaded, setTeamLoaded] = useState(false);
  const [teamToUpdate, setTeamToUpdate] = useState(null);

  useEffect(() => {
    csv(sportsData).then((res) => {
      setData(res);
    });
  });

  useEffect(() => {
    if (props.location.state.team.length > 0) {
      setOldTeam(props.location.state.team[0].name);
      setTeamToUpdate(props.location.state.team);
    }
  }, [props.location.state]);

  useEffect(() => {
    const userId = localStorage.getItem('userId');

    if (newTeam && newTeam.length === 1) {
      findBeatenTeams(newTeam);
      saveTeam();
    }
    if (newTeam && newTeam.length > 1) {
      getTeam(userId);
      findBeatenTeams(newTeam);
    }
  }, [newTeam]);

  useEffect(() => {
    const userId = localStorage.getItem('userId');

    if (oldTeam !== '') {
      setTeamLoaded(true);
    }
    if (oldTeam) {
      getTeam(userId);
    }
  }, [oldTeam]);

  useEffect(() => {
    if (newTeam && teamToUpdate) {
      const team = {
        name: newTeam,
      };
      updateTeam(team);
    }
    if (oldTeam && teamToUpdate) {
      const team = {
        name: oldTeam,
      };
      updateTeam(team);
    }
  }, [teamToUpdate]);

  const getTeam = (userId) => {
    axios
      .get(`${url}/team/${userId}`)
      .then((res) => {
        setTeamToUpdate(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    if (teamLoaded) {
      findBeatenTeams(oldTeam);
      setTeamLoaded(false);
    }
  }, [data]);

  const findBeatenTeams = (team) => {
    setBeatenTeams(
      data
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
        })
    );
  };

  const saveTeam = () => {
    const userId = localStorage.getItem('userId');

    const team = {
      name: newTeam,
      userId: userId,
    };
    axios
      .post(`${url}/team/create`, team)
      .then((res) => {
        console.log('Team Added');
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const updateTeam = (team) => {
    axios
      .post(`${url}/team/${teamToUpdate[0]._id}`, team)
      .then((res) => {
        console.log('Team updated');
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="sports-container">
      <h1 className="sports-title">Sport</h1>
      {data ? (
        <input
          type="text"
          placeholder="Input team name"
          value={oldTeam ? oldTeam : newTeam}
          onChange={(e) =>
            oldTeam || oldTeam === ''
              ? setOldTeam(e.target.value)
              : setNewTeam(e.target.value)
          }
          className="team-input"
        />
      ) : null}
      {beatenTeams ? (
        <ul className="team-list">
          {beatenTeams.map((team) => {
            return <li className="beaten-team">{team}</li>;
          })}
        </ul>
      ) : null}
    </div>
  );
}

export default Sport;
