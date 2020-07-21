var express = require('express');
var router = express.Router();
var UserController = require('../controllers/UserController');
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

router.post(
  '/register',
  upload.single('profilePicture'),
  UserController.register
);
router.post('/login', UserController.login);

module.exports = router;
