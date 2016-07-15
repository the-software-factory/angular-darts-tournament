'use strict';

// Declare app level module which depends on views, and components
angular.module('app', [
	'ngRoute',
	'app.home',
	'app.player',
	'app.round'
])
.config([
	'$locationProvider',
	'$routeProvider',
	function($locationProvider, $routeProvider) {
		$locationProvider.hashPrefix('!');
		$routeProvider.otherwise({redirectTo: '/'});
	}
]);