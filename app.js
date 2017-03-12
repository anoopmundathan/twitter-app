'use strict';

var express = require('express');

var app = express();

app.use(express.static(__dirname + '/public'));

// TODO - Body Parser
// TODO - Logger
// TODO - Database connection
// TODO - Routes
app.get('/login', function(req, res) {
	res.send('You clicked Login Page');
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