'use strict';

var OAuth = require('oauth').OAuth;
var config = require('../config/config');

var oauth = new OAuth(
	config.request_token_url,
	config.access_token_url,
	config.consumer_key,
	config.consumer_secret,
	config.oauth_version,
	config.oauth_callback,
	config.oauth_signature
);

module.exports = oauth;

