'use strict';

var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	
	req.clearCookie('oauth_access_token');
	req.clearCookie('oauth_access_token_secret');

	res.redirect('/');
});

module.exports = router;