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
	//Array che conterrà i vari oggetti giocatori
	$scope.players = [];

	//inizializzo e salvo i l'array di oggetti dei giocatori
	localStorage.setItem('players', JSON.stringify($scope.players));
	$scope.saved = localStorage.getItem('players');
	$scope.players = JSON.parse($scope.saved);

	// Aggiunge il nome tramite l'input e inizializza il punteggio, creando un array di oggetti in player
	$scope.addPlayer = function() {
		$scope.players.push({ 
			'name':$scope.name,
			'totScore':501
		});
    	$scope.name = '';
    	localStorage.setItem('players', JSON.stringify($scope.players));
	}

	//Cancella tutti i giocatori salvati
	$scope.removePlayer = function() {
		$scope.players = [];
		localStorage.setItem('players', JSON.stringify($scope.players));
	}
	
}]);