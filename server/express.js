var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var passport = require("passport");
var cookieParser = require('cookie-parser');
var session = require('express-session');
var errorHandler = require('errorhandler');
var swig  = require('swig');
var compression = require('compression');
var mongoose = require('mongoose');
var path = require('path');
var colors = require('colors');

module.exports = function(app, config){
  require('./passport')(passport);

  app.set('port', config.port);
  app.engine('html', swig.renderFile);
  app.set('view engine', 'html');
  app.set('views', config.rootPath + 'views/');
  app.use(compression());
  app.use(logger('dev'));
  app.use(cookieParser()); // read cookies for auth
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
//app.use(favicon(path.join(__dirname, 'public', 'favicon.png')));
  app.use(express.static(path.join(__dirname, '/../client/')));

// required for passport
  app.use(session({ secret: 'superdupersecretdonttellanyone' })); // session secret
  app.use(passport.initialize());
  app.use(passport.session()); // persistent login sessions

  app.use(function(err, req, res, next) {
    console.log(err.stack.red);
    res.status(err.status || 500);
    res.send({ message: err.message });
  });
}