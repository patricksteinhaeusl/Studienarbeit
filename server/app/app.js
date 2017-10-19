'use strict';

const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressJwt = require('express-jwt');
const config = require('./config');
const mongoUtil = require('./utils/mongoUtil');

const auth = require('./routes/auth');
const account = require('./routes/account');
const creditcard = require('./routes/creditCard');
const deliveryAddress = require('./routes/deliveryAddress');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(expressJwt(config.AUTH.validateOptions).unless(config.AUTH.unprotectedRoutes));

app.use('/auth', auth);
app.use('/account', account);
app.use('/creditcard', creditcard);
app.use('/deliveryAddress', deliveryAddress);

app.use(function (err, req, res) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('No valid token!');
  }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;