'use strict';
var oauth = require('./oauth');

module.exports.getAccessToken = function(req, res, next) {
	
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
}