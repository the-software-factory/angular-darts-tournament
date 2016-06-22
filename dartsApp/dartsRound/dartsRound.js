'use strict';

angular.module('dartsRound', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/round', {
    templateUrl: 'dartsRound/dartsRound.html',
    controller: 'roundCtrl'
  });
}])

.controller('roundCtrl', [function() {

}]);