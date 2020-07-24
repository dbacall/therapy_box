var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const passport = require('passport');

var usersRouter = require('./routes/users');
var tasksRouter = require('./routes/tasks');
var photosRouter = require('./routes/photos');
var teamRouter = require('./routes/team');

var bodyParser = require('body-parser');
var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
require('./config/passport')(passport);

app.use('/users', usersRouter);
app.use('/tasks', tasksRouter);
app.use('/photos', photosRouter);
app.use('/team', teamRouter);

module.exports = app;
