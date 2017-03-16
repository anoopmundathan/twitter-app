'use strict';
var oauth = require('./oauth');

// console.log(oauth.getOAuthRequestToken);

module.exports.getRequestToken = function (req, res, next) {

	oauth.getOAuthRequestToken(function(err, oauth_token, oauth_token_secret, results) {

		if (err || !results.oauth_callback_confirmed) { 
			return next(err);
		}

		res.cookie('oauth_token', oauth_token, { httpOnly: true });
		res.cookie('oauth_token_secret', oauth_token_secret, { httpOnly: true });

		req.oauth_token = oauth_token;

		return next();
	});
}