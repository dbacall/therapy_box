import React, { Component, useEffect, useState } from 'react';
import { csv } from 'd3';
import sportsData from '../assets/I1.csv';
import axios from 'axios';

function Sport(props) {
  const [data, setData] = useState(null);
  const [newTeam, setNewTeam] = useState('');
  const [oldTeam, setOldTeam] = useState('');
  const [beatenTeams, setBeatenTeams] = useState(null);
  const [teamLoaded, setTeamLoaded] = useState(false);

  useEffect(() => {
    csv(sportsData).then((res) => {
      setData(res);
    });
  });

  useEffect(() => {
    if (props.location.state.team.length > 0) {
      setOldTeam(props.location.state.team[0].name);
    }
    // findBeatenTeams();
  }, [props.location.state]);

  useEffect(() => {
    if (oldTeam !== '') {
      setTeamLoaded(true);
    }
    // findBeatenTeams();
  }, [oldTeam]);

  useEffect(() => {
    if (teamLoaded) {
      console.log(data);
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
    saveTeam();
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
    if (oldTeam === '') {
      const team = {
        name: newTeam,
        userId: userId,
      };
      axios
        .post('http://localhost:5000/team/create', team)
        .then((res) => {
          console.log('Team Added');
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
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
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  return (
    <div>
      <h1>Champions League Challenge</h1>
      {data ? (
        <form onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Input your team here..."
            value={oldTeam ? oldTeam : newTeam}
            onChange={(e) =>
              props.location.state.team
                ? setOldTeam(e.target.value)
                : setNewTeam(e.target.value)
            }
          />
          <input type="submit" value="Save your team" />
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

export default Sport;
