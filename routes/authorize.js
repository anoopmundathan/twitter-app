'use strict';

var router = require('express').Router();
var mid = require('../middleware/auth');

router.get('/', mid.oauthObject.getAccessToken, mid.oauthObject.getFriendList, function(req, res, next) {

	var arr = [];
	req.data.users.forEach(function(user) {
		arr.push(user.name);
	});
	res.json(arr);
});

module.exports = router;