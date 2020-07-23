var Photo = require('../models/Photo');

var PhotoController = {
  create: (req, res) => {
    var newPhoto = new Photo({
      userId: req.body.userId,
      photo: req.file.path,
    });
    newPhoto
      .save()
      .then(() =>
        res
          .status(200)
          .json({ message: 'Photo successfully added to database' })
      )
      .catch(() =>
        res.status(400).json({ error: 'Photo could not be added to database.' })
      );
  },

  all: (req, res) => {
    Photo.find({ userId: req.params.id }).then((photos) => {
      res.json(photos);
    });
  },
};
