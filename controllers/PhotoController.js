var Photo = require('../models/Photo');
const sharp = require('sharp');
const fs = require('fs');

var PhotoController = {
  create: (req, res) => {
    fs.access('../uploads', (err) => {
      if (err) {
        fs.mkdirSync('./uploads/');
      }
    });
    console.log('here is the buffer', req.file);
    const fileName = new Date().toISOString() + req.file.originalname;
    sharp(req.file.buffer)
      .resize({ width: 280, height: 280, fit: 'cover' })
      .toFile('./uploads/' + fileName)
      .then((data) => {
        console.log(data, req.file);
        var newPhoto = new Photo({
          userId: req.body.userId,
          photo: fileName,
        });
        newPhoto
          .save()
          .then(() =>
            res
              .status(200)
              .json({ message: 'Photo successfully added to database' })
          )
          .catch(() =>
            res
              .status(400)
              .json({ error: 'Photo could not be added to database.' })
          );
      });
  },

  all: (req, res) => {
    Photo.find({ userId: req.params.id }).then((photos) => {
      res.json(photos);
    });
  },
};

module.exports = PhotoController;
