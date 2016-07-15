'use strict';

angular.module('app.player', [
	'ngRoute'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/player', {
    templateUrl: 'player/player.view.html',
    controller: 'playerCtrl',
    controllerAs: 'vm'
  });
}]);