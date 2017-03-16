'use strict';
var express = require('express');
var router = require('express').Router();

router.use(function(req, res, next) {	
	// Not authenticated earlier
	if (!req.cookies.oauth_access_token || !req.cookies.oauth_access_token_secret) {
		return res.redirect('/login');
	}
	next();
});

// Serve angular app once authenticated
router.use('/', express.static('public'));

module.exports = router;