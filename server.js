var express      = require('express');
var path         = require('path');
var logger       = require('morgan');
var bodyParser   = require('body-parser');
var debug        = require('debug')('app:http');
var cookieParser = require('cookie-parser');
var passport     = require('passport');
var dotenv       = require('dotenv').config();
var mongoose     = require('mongoose');
var cors = require('cors')


// Load local libraries.
var routes   = require('./config/routes');
  require('./config/database')

// Instantiate a server application.
var app = express();

//cors
app.use(cors())

//Static Pages
app.use( express.static( "public" ) );

// Logging layer.
// app.use(logger('dev'));

// Helper layer (parses the requests, and adds further data).
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));




app.use(express.static(path.join(__dirname, 'public')));


// Setting up the Passport Strategies
app.use(passport.initialize());
app.use(passport.session());

// Defines all routes.
app.use('/', routes);


app.listen(process.env.PORT || '8080')

module.exports = app;
