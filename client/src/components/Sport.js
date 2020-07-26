import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { csv } from 'd3';
import sportsData from '../assets/I1.csv';
import axios from 'axios';
import '../stylesheets/Sport.css';

function Sport(props) {
  const [data, setData] = useState(null);
  const [newTeam, setNewTeam] = useState('');
  const [oldTeam, setOldTeam] = useState(null);
  const [beatenTeams, setBeatenTeams] = useState(null);
  const [teamLoaded, setTeamLoaded] = useState(false);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    csv(sportsData).then((res) => {
      setData(res);
    });
  });

  useEffect(() => {
    if (props.location.state.team.length > 0) {
      setOldTeam(props.location.state.team[0].name);
    }
  }, [props.location.state]);

  useEffect(() => {
    if (newTeam.length > 0) {
      findBeatenTeams(newTeam);
    }
  }, [newTeam]);

  useEffect(() => {
    if (oldTeam !== '') {
      setTeamLoaded(true);
    }
  }, [oldTeam]);

  useEffect(() => {
    if (teamLoaded) {
      findBeatenTeams(oldTeam);
      setTeamLoaded(false);
    }
  }, [data]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (newTeam !== '') {
      findBeatenTeams(newTeam);
    } else {
      findBeatenTeams(oldTeam);
    }
    if (oldTeam) {
      updateTeam();
    } else {
      saveTeam();
    }
  };

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
    const userId = props.location.state.user.id;

    const team = {
      name: newTeam,
      userId: userId,
    };
    axios
      .post('http://localhost:5000/team/create', team)
      .then((res) => {
        console.log('Team Added');
        setRedirect(true);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const updateTeam = () => {
    const teamToUpdate = {
      name: oldTeam,
    };
    axios
      .post(
        `http://localhost:5000/team/${props.location.state.team[0]._id}`,
        teamToUpdate
      )
      .then((res) => {
        console.log('Team updated');
        setRedirect(true);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return redirect ? (
    <Redirect
      to={{
        pathname: '/',
        state: { user: props.location.state.user },
      }}
    />
  ) : (
    <div className="sports-container">
      <h1 className="sports-title">Sport</h1>
      {data ? (
        <form onSubmit={onSubmit}>
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
          <input
            type="submit"
            value="Save your team"
            className="team-input-btn"
          />
        </form>
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
