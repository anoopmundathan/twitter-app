webpackJsonp([0],{

/***/ 4:
/***/ (function(module, exports, __webpack_require__) {

var angular = __webpack_require__(1);

var twitterApp = angular.module('twitterApp', [__webpack_require__(0)]);

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


/***/ })

},[4]);