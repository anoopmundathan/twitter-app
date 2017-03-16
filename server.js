'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(logger('dev'));

// TODO - Database connection
// TODO - Routes
app.use('/app', require('./routes/app'));
app.use('/login', require('./routes/login'));
app.use('/authorize', require('./routes/authorize'));

// Make /app as default route
app.get('/', function(req, res) {
	return res.redirect('/app');
});

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Resource not Found');
	err.status = 404;
	next(err);
});

// Error Handler
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.json({
		error: {
			message: err.message
		}
	});
});


var PORT = process.env.PORT || 3000;

app.listen(PORT, function() {
	console.log('Server running at port', PORT);
});