'use strict';
var oauth = require('./oauth');

module.exports.loadTweets = function(req, res, callback) {
	
	var access_token = req.cookies.oauth_access_token;
	var access_secret = req.cookies.oauth_access_token_secret;
	var url = 'https://api.twitter.com/1.1/statuses/user_timeline.json?count=100';

	oauth.get(url, access_token, access_secret, function(error, data) {
		if (error) return callback(error);
		return callback(JSON.parse(data));
	});
}