var Task = require('../models/Task');

var TaskController = {
  create: (req, res) => {
    var newTask = new Task(req.body);

    newTask
      .save()
      .then(() =>
        res.status(200).json({ message: 'Task successfully added to database' })
      )
      .catch(() =>
        res.status(400).json({ error: 'Task could not be added to database.' })
      );
  },

  all: (req, res) => {
    Task.find({ userId: req.params.id }).then((tasks) => {
      res.json(tasks);
    });
  },

  update: (req, res) => {
    Task.findByIdAndUpdate(
      { _id: req.params.id },
      { message: req.body.message, completed: req.body.completed }
    )
      .then(() =>
        res.status(200).json({ message: 'Task successfully updated' })
      )
      .catch(() =>
        res.status(400).json({ error: 'Task could not be updated.' })
      );
  },
};

module.exports = TaskController;
