'use strict';

angular.module('home', [
	'ngRoute'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'home/home.view.html',
    controller: 'homeCtrl'
  });
}]);