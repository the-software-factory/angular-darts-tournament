'use strict';

// Declare app level module which depends on views, and components
angular
  .module('app', [
    'ngRoute',
    'ngStorage',
    'app.home',
    'app.players',
    'app.prizegiving',
    'app.round',
    'app.summary',
    'app.settings',
    'app.stats'
  ])

  .config([
    '$locationProvider',
    '$routeProvider',
    function($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');
      // Redirects user to the main page if the selected one does not exist
      $routeProvider.otherwise({redirectTo: '/'});
    }
  ]);
