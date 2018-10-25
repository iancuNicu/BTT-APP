require('./bin/config');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');

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

var indexRouter = require('./routes/index');
var signUpRouter = require('./routes/signup');
var loginRouter = require('./routes/login');
var homeRouter = require('./routes/home');
var adminRouter = require('./admin/admin-route');
var {adminTrainingRouter} = require('./routes/training');
var {trainingRouter}  = require('./routes/training');
var videoRouter = require('./routes/video');

app.use(function(req, res, next) {
    res.set({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Expose-Headers': 'Authorization'
    });
    next();
});

app.use('/api/', indexRouter);
app.use('/api/signup', signUpRouter);
app.use('/api/login', loginRouter);
app.use('/api/home', homeRouter);
app.use('/api/admin', adminRouter);
app.use('/api/training', trainingRouter);
app.use('/api/admin/training', adminTrainingRouter);
app.use('/api/video', videoRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
});

module.exports = app;
