'use strict';

angular.module('player', [
	'ngRoute',
	'ngStorage'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/player', {
    templateUrl: 'player/player.html',
    controller: 'playerCtrl'
  });
}])

.controller('playerCtrl', ['$scope', '$localStorage', function ($scope, $localStorage) {
	//Array che conterrà i vari oggetti giocatori
	$scope.players = [];
	//Array che conterrà i vari oggetti giocatori "permanenti"
	$scope.storagePlayers = [];
	// Serve per salvarci temporalmente l'ultimo giocatore inserito
	var currentPlayerSaved = {};

	$scope.saved = localStorage.getItem('players');
	$scope.savedStorage = localStorage.getItem('storagePlayers');

	// se sono presenti dei giocatori abituali, li carico
	if (localStorage.getItem('storagePlayers') !== null) {
		$scope.storagePlayers = JSON.parse($scope.savedStorage);
	}

	//$scope.storagePlayers = []; debug -> elimino tutto

	localStorage.setItem('players', JSON.stringify($scope.players));
	localStorage.setItem('storagePlayers', JSON.stringify($scope.storagePlayers));



	// Aggiunge un giocatore tramite l'input e inizializza il punteggio, creando un array di oggetti in player
	$scope.addPlayer = function() {
		$scope.players.push({ 
			'name':$scope.name,
			'totScore':501
		});
    	$scope.name = ''; //pulisce l'input
    	currentPlayerSaved = $scope.players[$scope.players.length-1]; 
    	$scope.storagePlayers.push(currentPlayerSaved); //inserisco il giocatore nella lista dei giocatori abituali
    	localStorage.setItem('players', JSON.stringify($scope.players));
    	localStorage.setItem('storagePlayers', JSON.stringify($scope.storagePlayers));
	};


	//Cancella tutti i giocatori inseriti nell'input
	$scope.removePlayer = function() {
		$scope.players = [];
		localStorage.setItem('players', JSON.stringify($scope.players));
	};

	// rimuove solo il giocatore "selezionato" nella tabella dei giocatori abituali
	$scope.removePlayerStorage = function(item) {
		var index = $scope.storagePlayers.indexOf(item);
		$scope.storagePlayers.splice(index, 1);
		localStorage.setItem('storagePlayers', JSON.stringify($scope.storagePlayers));
	}

	
	//inserisce il giocatore della tabella dei giocatori abituali nella lista dei giocatori "pronti" ad iniziare
	$scope.addPlayerInList = function(friend) {
		$scope.players.push(friend);
		localStorage.setItem('players', JSON.stringify($scope.players));
	}

}]);