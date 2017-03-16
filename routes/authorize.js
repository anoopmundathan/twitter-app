'use strict';

var router = require('express').Router();
var mid = require('../middleware/access-token');

router.get('/', mid.getAccessToken, function(req, res, next) {
	return next();
});

module.exports = router;