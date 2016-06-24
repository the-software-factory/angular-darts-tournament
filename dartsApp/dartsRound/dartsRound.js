'use strict';

angular.module('dartsRound', [
	'ngRoute',
	'ngStorage'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/round', {
    templateUrl: 'dartsRound/dartsRound.html',
    controller: 'roundCtrl'
  });
}])

.controller('roundCtrl', ['$scope', '$localStorage', function ($scope, $localStorage) {
	$scope.saved = localStorage.getItem('players');
	$scope.players = JSON.parse($scope.saved);

	
	// Inizializzo il round a 1, e poi viene incrementato
	$scope.rounds = 1;

	// Calcolo il numero di giocatori che stanno giocando
	$scope.totPlayers = $scope.players.length;
	var i = $scope.totPlayers - 1;

	// Inizializza la schermata con l'ultimo giocatore aggiunto
	$scope.currentPlayer = $scope.players[i].name;

	// Inizializzo il punteggio con quello dell'ultimo giocatore (perchè sarà il primo a giocare)
	$scope.currentScore = $scope.players[i].totScore;

	// Serve per fermare il gioco in caso di vittoria
	$scope.win = false;

	//viariabili che contengono il punteggio del round e il punteggio corrente di ogni lancio
	$scope.scoreRound = 0;
	var currentShot = 0;


	$scope.loadRound = function() {
		$scope.scoreRound = 0;
		clearInput();
		$scope.buttonClicked1 = false;
		$scope.buttonClicked2 = false;
		$scope.buttonClicked3 = false;
		$scope.players[i].totScore = $scope.currentScore;
		localStorage.setItem('players', JSON.stringify($scope.players));


		if(i != 0) {
			i--;
			$scope.currentPlayer = $scope.players[i].name;
			$scope.currentScore = $scope.players[i].totScore;
		}
		else{
			$scope.rounds += 1;
			i = $scope.totPlayers - 1;
			$scope.currentPlayer = $scope.players[i].name;
			$scope.currentScore = $scope.players[i].totScore;
		}
	}


/*########### devo trasformare queste 3 funzioni in 1 ###################*/

	$scope.addScore1 = function() {
		currentShot = 0;
		$scope.buttonClicked1 = true;
		$scope.scoreRound += parseInt($scope.fShot);
		currentShot = parseInt($scope.fShot);
		$scope.currentScore -= currentShot;
		if ($scope.currentScore == 0) {
/*
			$.post("https://hooks.slack.com/services/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" ,{
				'payload' : '{"text": "I won :)"}'
			});
*/
			$scope.win = true;
			$scope.congratulations = "Complimenti sei il vincitore!!!";
		}
		if ($scope.currentScore < 0) {
			$scope.currentScore += currentShot;
			$scope.scoreRound = 0;
			$scope.buttonClicked2 = true;
			$scope.buttonClicked3 = true;
		}

	}

	$scope.addScore2 = function() {
		currentShot = 0;
		$scope.buttonClicked2 = true;
		$scope.scoreRound += parseInt($scope.sShot);
		currentShot = parseInt($scope.sShot);
		$scope.currentScore -= currentShot;
		if ($scope.currentScore == 0) {
			/*
			$.post("https://hooks.slack.com/services/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" ,{
				'payload' : '{"text": "I won :)"}'
			});
*/
			$scope.win = true;
			$scope.congratulations = "Complimenti sei il vincitore!!!";
		}
		if ($scope.currentScore < 0) {
			$scope.currentScore += currentShot;
			$scope.scoreRound = 0;
			$scope.buttonClicked3 = true;
		}

	}

	$scope.addScore3 = function() {
		currentShot = 0;
		$scope.buttonClicked3 = true;
		$scope.scoreRound += parseInt($scope.tShot);
		currentShot = parseInt($scope.tShot);
		$scope.currentScore -= currentShot;
		if ($scope.currentScore == 0) {
			/*
			$.post("https://hooks.slack.com/services/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" ,{
				'payload' : '{"text": "I won :)"}'
			});
*/
			$scope.win = true;
			$scope.congratulations = "Complimenti sei il vincitore!!!";
		}
		if ($scope.currentScore < 0) {
			$scope.currentScore += currentShot;
			$scope.scoreRound = 0;
		}

	} 

	//Ripulisce le input dopo ogni click
	var clearInput = function() {
		$scope.fShot = '';
		$scope.sShot = '';
		$scope.tShot = '';
	};





}]);