const mongoose = require('mongoose');

const PhotoSchema = new mongoose.Schema({
  photo: {
    type: String,
  },
  userId: {
    type: String,
  },
});

var Photo = mongoose.model('Photo', PhotoSchema);

module.exports = Photo;
