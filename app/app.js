'use strict';

// Declare app level module which depends on views, and components
angular.module('app', [
  'ngRoute',
  'home',
  'player',
  'round'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/'});
}]);