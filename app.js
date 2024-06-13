var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let session = require("express-session");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productRouter = require('./routes/product');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'myapp',
  resave: false,
  saveUninitialized: true
}));

// Middleware to make session data available to all views
app.use(function(req, res, next) {
  if (req.session.user != undefined) {
    res.locals.user = req.session.user;
  }
  return next();
});

// Middleware to handle the cookie
app.use(function(req, res, next) {
  if (req.cookies.id != undefined && req.session.user == undefined) {
    let idDeLaCookie = req.cookies.id;

    db.User.findByPk(idDeLaCookie)
      .then(user => {
        req.session.user = user; // Put the entire user instance into session.
        res.locals.user = user;
        return next();
      })
      .catch(e => {
        console.log(e);
        return next();
      });
  } else {
    return next();
  }
});

app.use('/', indexRouter);
app.use('/product', productRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
