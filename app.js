var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require("express-session");
const db = require('./database/models');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productRouter = require('./routes/product');

var app = express();

// Configuración de vistas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Configuración de sesión
app.use(session({
  secret: 'proyectont',
  resave: false,
  saveUninitialized: true
}));

// Middleware para disponibilidad de datos de sesión en las vistas
app.use(function(req, res, next) {
  if (req.session.user) {
    res.locals.user = req.session.user;
  }
  next();
});

// Middleware para gestión de cookies
app.use(function(req, res, next) {
  if (req.cookies.userId && !req.session.user) {
    let idDeLaCookie = req.cookies.userId;

    db.User.findByPk(idDeLaCookie)
      .then(user => {
        if (user) {
          req.session.user = user; // Guarda el modelo completo del usuario en la sesión
          res.locals.user = user; // Hace que el usuario esté disponible en las vistas
        }
        next();
      })
      .catch(err => {
        console.error('Error al buscar el usuario:', err);
        next();
      });
  } else {
    next();
  }
});
// Rutas
app.use('/', indexRouter);
app.use('/product', productRouter);
app.use('/users', usersRouter);

// Middleware para manejar errores 404
app.use(function(req, res, next) {
  next(createError(404));
});

// Middleware para manejar otros errores
app.use(function(err, req, res, next) {
  // Establecer locals, proporcionando solo el error en entorno de desarrollo
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Renderizar la página de error
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
