'use strict';

angular.module('app.win', [
  'ngRoute',
  'ngStorage'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/win', {
    templateUrl: 'win/win.view.html',
    controller: 'winCtrl',
    controllerAs: 'vm'
  });
}]);
