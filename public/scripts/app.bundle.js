webpackJsonp([0],{

/***/ 4:
/***/ (function(module, exports, __webpack_require__) {

var angular = __webpack_require__(1);

var twitterApp = angular.module('twitterApp', [__webpack_require__(0)]);

// config

twitterApp.config(function($routeProvider, $locationProvider) {
	
	$locationProvider.hashPrefix('');

	$routeProvider

		// route for tweets
		.when('/tweets', {
			templateUrl: 'templates/tweets.html',
			controller: 'tweetsController'
		})

		// route for profile
		.when('/profile', {
			templateUrl: 'templates/profile.html',
			controller: 'profileController'	
		})

		// route for logout
		.when('/logout', {
			controller: 'logoutController'
		});
});

twitterApp.controller('tweetsController', function($scope, $http) {
	$scope.tweets = [];
	$http.get('/app/tweets')
	.then(function(response) {
		response.data.forEach(function(item) {
			$scope.tweets.push(item.text);
		});
	}, function(error) {
		console.log('error');
	});
});

twitterApp.controller('profileController', function($scope, $http) {
	$http.get('/app/profile')
	.then(function(response) {
		$scope.profile = response.data;
	}, function(error) {
		console.log('error');
	});
});

twitterApp.controller('logoutController', function($scope, $location) {
	$location.path('/');
});


/***/ })

},[4]);