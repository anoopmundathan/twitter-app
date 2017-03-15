var angular = require('angular');

var twitterApp = angular.module('twitterApp', [require('angular-route')]);

twitterApp.config(function($routeProvider, $locationProvider, $httpProvider) {
	$locationProvider.hashPrefix('');
	$httpProvider.defaults.useXDomain = true;

	$routeProvider
		.when('/', {
			controller: 'mainController',
			templateUrl: 'templates/login.html'
		})
		.when('/tweets', {
			controller: 'tweetsController',
			templateUrl: 'templates/tweets.html'
		});
});

twitterApp.controller('mainController', function($scope, $http) {
	$scope.message = "Hello Twitter";
	
	function loginToTwitter() {
		$http({
        	url: '/login',
        	method: "GET",
        	withCredentials: true,
        	headers: {
                    'Content-Type': 'application/json; charset=utf-8'
        	}
    	});

		// $http.get('/login')
		// 	.then(function(response) {
		// 		console.log(response.data);
		// 	});
	}
	
	$scope.loginToTwitter = loginToTwitter;

});

twitterApp.controller('tweetsController', function($scope) {
	$scope.tweets = {
		users: ['user1', 'user2', 'user3']
	};
});