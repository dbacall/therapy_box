const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  userId: {
    type: String,
    required: true,
  },
});

var Task = mongoose.model('Task', TaskSchema);

module.exports = Task;
