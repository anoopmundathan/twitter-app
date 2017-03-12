'use strict';

var router = require('express').Router();
var mid = require('../middleware/auth');

router.get('/', mid.getAccessToken, function(req, res, next) {
	// Step 3: Converting the request token to an access token
	res.send('Step3');

});
module.exports = router;