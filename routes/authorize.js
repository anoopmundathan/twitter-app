'use strict';

var router = require('express').Router();
var mid = require('../middleware/access-token');

router.get('/', mid.getAccessToken, function(req, res, next) {
	res.redirect('/app');
});

module.exports = router;
