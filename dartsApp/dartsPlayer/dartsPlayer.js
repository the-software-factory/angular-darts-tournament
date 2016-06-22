'use strict';

angular.module('dartsPlayer', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/player', {
    templateUrl: 'dartsPlayer/dartsPlayer.html',
    controller: 'playerCtrl'
  });
}])

.controller('playerCtrl', function ($scope) {
	$scope.players = [];
	$scope.addPlayer = function() {
		$scope.players.push({ 'name':$scope.name });
    	$scope.name='';
	}	
});