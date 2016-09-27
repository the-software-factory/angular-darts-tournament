'use strict';

angular.module('app.round', [
  'ngRoute',
  'ngStorage'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/round', {
    templateUrl: 'round/round.view.html',
    controller: 'roundCtrl',
    controllerAs: 'vm'
  });
}]);
