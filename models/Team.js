const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
});

var Team = mongoose.model('Team', TeamSchema);

module.exports = Team;
