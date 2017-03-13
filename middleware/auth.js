'use strict';

var OAuth = require('oauth').OAuth;
var config = require('../config/config');

// Create oauth object for accessing Twitter
var oauth = new OAuth(
	config.request_token_url,
	config.access_token_url,
	config.consumer_key,
	config.consumer_secret,
	config.oauth_version,
	config.oauth_callback,
	config.oauth_signature
);

var oauthObject = {
	getRequestToken: function(req, res, next) {
		oauth.getOAuthRequestToken(function(err, oauth_token, oauth_token_secret, results) {
		
			if (err || !results.oauth_callback_confirmed) return next(err);

			res.cookie('oauth_token', oauth_token, { httpOnly: true });
			res.cookie('oauth_token_secret', oauth_token_secret, { httpOnly: true });

			req.oauth_token = oauth_token;

			return next();
		});
	},
	getAccessToken: function(req, res, next) {
		var oauthToken = req.cookies.oauth_token;
		var oauthTokenSecret = req.cookies.oauth_token_secret;
		var oauthVerifier = req.query.oauth_verifier;

		oauth.getOAuthAccessToken(oauthToken, oauthTokenSecret, oauthVerifier, 
			function(err, oauth_access_token, oauth_access_token_secret, results) {
				if (err) return next(err);

				res.cookie('oauth_access_token', oauth_access_token, { httpOnly: true });
				res.cookie('oauth_access_token_secret', oauth_access_token_secret, { httpOnly: true });

				req.oauth_access_token = oauth_access_token;
				req.oauth_access_token_secret = oauth_access_token_secret;
				return next();
		});
	},
	getFriendList: function(req, res, next) {
		oauth.get('https://api.twitter.com/1.1/friends/list.json', 
		req.cookies.oauth_access_token,
		req.cookies.oauth_access_token_secret,
		function(err, data) {
			if (err) return next(err);
			req.data = JSON.parse(data);
			return next();
		});
	}
}

module.exports.oauthObject = oauthObject;