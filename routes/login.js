'use strict';

var router = require('express').Router();
var mid = require('../middleware/auth');
var config = require('../config/config');

// router.get('/', mid.getRequestToken, function(req, res, next) {
// 	res.redirect(config.authorize_url + '?oauth_token=' + req.oauth_token);
// });
// console.log(mid.oauthObject.getRequestToken);

router.get('/', mid.oauthObject.getRequestToken, function(req, res, next) {
	res.redirect(config.authorize_url + '?oauth_token=' + req.oauth_token);
});


module.exports = router;