'use strict';

angular.module('dartsRound', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/round', {
    templateUrl: 'dartsRound/dartsRound.html',
    controller: 'roundCtrl'
  });
}])

.controller('roundCtrl', ['$scope', '$localStorage', function ($scope, $localStorage) {
	$scope.saved = localStorage.getItem('players');
	$scope.players = JSON.parse($scope.saved);

	$scope.totPlayers = $scope.players.length;


}]);