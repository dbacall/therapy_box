var Team = require('../models/Team');

var TeamController = {
  create: (req, res) => {
    var newTeam = new Team(req.body);

    newTeam
      .save()
      .then(() =>
        res.status(200).json({ message: 'Team successfully added to database' })
      )
      .catch(() =>
        res.status(400).json({ error: 'Team could not be added to database.' })
      );
  },

  all: (req, res) => {
    Team.find({ userId: req.params.id }).then((team) => {
      res.json(team);
    });
  },

  update: (req, res) => {
    Team.findByIdAndUpdate({ _id: req.params.id }, { name: req.body.message })
      .then(() =>
        res.status(200).json({ message: 'Team successfully updated' })
      )
      .catch(() =>
        res.status(400).json({ error: 'Team could not be updated.' })
      );
  },
};

module.exports = TeamController;
