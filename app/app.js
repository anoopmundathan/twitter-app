var angular = require('angular');

var twitterApp = angular.module('twitterApp', [require('angular-route')]);

twitterApp.controller('mainController', function($scope) {
	$scope.message = "Hello Twitter";
});