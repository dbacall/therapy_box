var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const passport = require('passport');

var usersRouter = require('./routes/users');
var tasksRouter = require('./routes/tasks');
var photosRouter = require('./routes/photos');
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

module.exports = app;

// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const passport = require('passport');
// const path = require('path');
// var usersRouter = require('./routes/users');

// const db = require('./config/keys').mongoURI;

// const app = express();

// var cors = require('cors');

// require('dotenv').config();
// // use it before all route definitions
// app.use(cors());

// app.use(
//   bodyParser.urlencoded({
//     extended: false,
//   })
// );
// app.use(bodyParser.json());

// mongoose
//   .connect(db, {
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//     useNewUrlParser: true,
//   })
//   .then(() => console.log('DB Connected!'))
//   .catch((err) => {
//     console.log(err);
//   });

// app.use(passport.initialize());

// require('./config/passport')(passport);

// app.use('/users', usersRouter);

// // Serve static assets if in production
// if (process.env.NODE_ENV === 'production') {
//   // Set static folder
//   app.use(express.static(path.join(__dirname, 'client', 'build')));

//   app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
//   });
// }
// const host = '0.0.0.0';
// const port = 5000;

// app.listen(port, host, () =>
//   console.log(`Server up and running on port ${port}`)
// );
