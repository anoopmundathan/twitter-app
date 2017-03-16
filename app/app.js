var angular = require('angular');

var twitterApp = angular.module('twitterApp', [require('angular-route')]);

twitterApp.controller('mainController', function($scope, $http) {
	
	$scope.hello = "You are succesfully authenticated...time to show some tweets";
	$scope.tweets = [];

	function loadTweets() {
		$http.get('/app/tweets')
			.then(function(response) {
				response.data.forEach(function(item) {
					$scope.tweets.push(item.text);
				});
			});
	}

	$scope.loadTweets = loadTweets;
});
