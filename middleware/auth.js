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

function getRequestToken(req, res, next) {

	// 1. Obtaining a request token
	// POST https://api.twitter.com/oauth/request_token
	oauth.getOAuthRequestToken(function(error, oauth_token, oauth_token_secret, results) {
		if (error || !results.oauth_callback_confirmed) return next(error);

		// Store values in cookie
		res.cookie('oauth_token', oauth_token, { httpOnly: true });
		res.cookie('oauth_token_secret', oauth_token_secret, { httpOnly: true });

		// Store token in request object
		req.oauth_token = oauth_token;

		return next();
	});
}

function getAccessToken(req, res, next) {
	
	oauth.getOAuthAccessToken(req.cookies.oauth_token, req.cookies.oauth_token_secret, req.query.oauth_verifier,
		function(error, oauth_access_token, oauth_access_token_secret, results) {
			
				
			// Get the user's Twitter ID
			oauth.get('https://api.twitter.com/1.1/account/verify_credentials.json',
				oauth_access_token, oauth_access_token_secret,
				function(error, data) {
					// if (error) {
					// 	res.render('login');
					// }

					// Parse the JSON response
					// data = JSON.parse(data);

					// Store the access token, access token secret, and user's Twitter ID in cookies
					res.cookie('access_token', oauth_access_token, { httpOnly: true });
					res.cookie('access_token_secret', oauth_access_token_secret, { httpOnly: true });
					res.cookie('twitter_id', data.id_str, { httpOnly: true });

					// Tell router that authentication was successful
					res.redirect('/');
				});
	});

	return next();
}

module.exports.getRequestToken = getRequestToken;
module.exports.getAccessToken = getAccessToken;
