'use strict';

angular.module('app.round', [
	'ngRoute'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/round', {
    templateUrl: 'round/round.view.html',
    controller: 'roundCtrl',
    controllerAs: 'vm'
  });
}]);
