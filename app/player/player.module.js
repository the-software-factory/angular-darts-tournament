'use strict';

angular.module('app.player', [
  'ngRoute',
  'ngStorage'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/player', {
    templateUrl: 'player/player.view.html',
    controller: 'playerCtrl',
    controllerAs: 'vm'
  });
}]);
