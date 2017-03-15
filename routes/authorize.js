'use strict';

var router = require('express').Router();
var mid = require('../middleware/access-token');

router.get('/', mid.getAccessToken, function(req, res, next) {
	res.send('Access token received');
});

module.exports = router;