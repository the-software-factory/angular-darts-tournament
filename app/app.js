'use strict';

// Declare app level module which depends on views, and components
angular
	.module('app', [
		'ngRoute',
		'ngStorage',
		'app.home',
		'app.player',
		'app.round'
	])

	.config([
		'$routeProvider',
		function($routeProvider) {
			// Redirects user to the main page if the selected one does not exist
			$routeProvider.otherwise({redirectTo: '/'});
		}
	]);
