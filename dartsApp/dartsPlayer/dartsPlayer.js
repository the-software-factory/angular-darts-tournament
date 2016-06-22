'use strict';

angular.module('dartsPlayer', [
	'ngRoute',
	'ngStorage'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/player', {
    templateUrl: 'dartsPlayer/dartsPlayer.html',
    controller: 'playerCtrl'
  });
}])

.controller('playerCtrl', ['$scope', '$localStorage', function ($scope, $localStorage) {
	$scope.players = [];

	$scope.saved = localStorage.getItem('players');
	if (localStorage.getItem('players')!==null) {
		$scope.players = JSON.parse($scope.saved);
	}

	$scope.addPlayer = function() {
		$scope.players.push({ 'name':$scope.name });
    	$scope.name = '';
    	localStorage.setItem('players', JSON.stringify($scope.players));
	}

	$scope.removePlayer = function() {
		$scope.players = [];
		localStorage.setItem('players', JSON.stringify($scope.players));
	}
	
}]);