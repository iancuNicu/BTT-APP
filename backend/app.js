require('./bin/config');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
require('dotenv').config();

var {passport} = require('./admin/admin-auth');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));
app.use(passport.initialize());
app.use(passport.session());

const indexRouter = require('./routes/index');
const signUpRouter = require('./routes/signup');
const loginRouter = require('./routes/login');
const adminRouter = require('./admin/admin-route');
const {adminTrainingRouter} = require('./routes/training');
const {trainingRouter}  = require('./routes/training');
const videoRouter = require('./routes/video');
const bettingRouter = require('./routes/betting');

app.use(function(req, res, next) {
    res.set({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Expose-Headers': 'Authorization, Accept, X-Application'
    });
    next();
});

app.use('/api/', indexRouter);
app.use('/api/signup', signUpRouter);
app.use('/api/login', loginRouter);
app.use('/api/admin', adminRouter);
app.use('/api/training', trainingRouter);
app.use('/api/admin/training', adminTrainingRouter);
app.use('/api/video', videoRouter);
app.use('/api/betting', bettingRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  if(res.body.token){
      next();
  }
  else{
      next(createError(404));
  }
});

// error handler
app.use(function(err, req, res, next) {
  if(req.token || res.token){
      next();
  }
  else {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};

      res.status(err.status || 500);
  }
});

module.exports = app;
