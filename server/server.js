var express = require('express');
var mongoose = require('mongoose');

var app = express();

var mongoURI = 'mongodb://localhost/DeliciousIrony';
mongoose.connect(mongoURI);

require('./config/middleware.js')(app, express);

module.exports = app;
