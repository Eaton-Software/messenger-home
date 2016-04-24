'use strict';
var express = require('express');
var path = require('path');
// var favicon = require('serve-favicon');
var winston = require('winston');
var expressWinston = require('express-winston');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var SpotifyStrategy = require('passport-spotify').Strategy;

var keys = require('./keys');
var routes = require('./routes/index');
var fb = require('./routes/fb');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
var logger = new winston.Logger({
  transports: [
    new winston.transports.File({
      level: 'info',
      filename: './debug-logs.log',
      handleExceptions: true,
      json: true,
      maxsize: 5242880, //5MB
      maxFiles: 5,
      colorize: false
    }),
    new winston.transports.Console({
      level: 'debug',
      handleExceptions: true,
      json: false,
      colorize: true
    })
  ],
  exitOnError: false
});

app.use(expressWinston.logger({
  winstonInstance: logger,
  meta: false,
  expressFormat: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session(
  { secret: 'keyboard cat',
    saveUninitialized: false,
    resave: false }
));
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/bot', fb);

app.use(expressWinston.errorLogger({
  winstonInstance: logger
}));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) { // eslint-disable-line no-unused-vars
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) { // eslint-disable-line no-unused-vars
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


passport.use(new SpotifyStrategy({
  clientID: keys.SPOTIFY_ID,
  clientSecret: keys.SPOTIFY_SECRET,
  callbackURL: keys.SPOTIFY_CB
},
function(accessToken, refreshToken, profile, done) {
  profile.accessToken = accessToken;
  profile.refreshToken = refreshToken;
  return done(null, profile);
}));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});


module.exports = app;
