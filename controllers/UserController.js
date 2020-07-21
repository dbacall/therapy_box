const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');

const User = require('../models/User');

var UserController = {
  register: (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }
    User.findOne({
      $or: [{ email: req.body.email }, { username: req.body.username }],
    }).then((user) => {
      if (user) {
        return res
          .status(400)
          .json({ email: 'Email or Username already exists' });
      } else {
        const newUser = new User({
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then((user) => res.json(user))
              .catch((err) => console.log(err));
          });
        });
      }
    });
  },

  login: (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({ username }).then((user) => {
      if (!user) {
        return res.status(404).json({ usernotfound: 'User not found' });
      }

      bcrypt.compare(password, user.password).then((isMatch) => {
        if (isMatch) {
          const payload = {
            id: user.id,
            username: user.username,
          };

          jwt.sign(
            payload,
            keys.secretOrKey,
            {
              expiresIn: 31556926, // 1 year in seconds
            },
            (err, token) => {
              res.json({
                success: true,
                token: 'Bearer ' + token,
              });
            }
          );
        } else {
          return res
            .status(400)
            .json({ passwordincorrect: 'Password incorrect' });
        }
      });
    });
  },
};

module.exports = UserController;
