var express = require('express');
var router = express.Router();
var PhotoController = require('../controllers/PhotoController');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post('/create', upload.single('photo'), PhotoController.create);
router.get('/:id', PhotoController.all);

module.exports = router;
