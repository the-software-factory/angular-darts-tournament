'use strict';

angular.module('app.round')

.controller('roundCtrl', [function () {

	var vm = this;

	vm.saved = localStorage.getItem('players');
	vm.players = JSON.parse(vm.saved);

	// Inizializzo il round a 1, e poi viene incrementato
	vm.rounds = 1;

	// Calcolo il numero di giocatori che stanno giocando
	vm.totPlayers = vm.players.length;
	var i = vm.totPlayers - 1;

	// Inizializza la schermata con l'ultimo giocatore aggiunto
	vm.currentPlayer = vm.players[i].name;

	// Inizializzo il punteggio con quello dell'ultimo giocatore (perchè sarà il primo a giocare)
	vm.currentScore = vm.players[i].totScore;

	// Serve per fermare il gioco in caso di vittoria
	vm.win = false;

	//serve per salvare ad ogni round il punteggio di tutti i giocatori e vedere se c'è una differenza di 60 punti
	vm.arrayScore = [];

	//viariabili che contengono rispettivamente il punteggio del round e il punteggio corrente di ogni lancio
	vm.scoreRound = 0;
	var currentShot = 0;

	/*
		ad ogni click sul pulsante avanti un altro:
		- i pulsanti + vengono attivati
		- il punteggio tot del giocatore viene aggiornato e salvato
	*/
	vm.loadRound = function() {
		vm.scoreRound = 0;
		clearInput();
		vm.buttonClicked1 = false;
		vm.buttonClicked2 = false;
		vm.buttonClicked3 = false;
		vm.players[i].totScore = vm.currentScore;
		localStorage.setItem('players', JSON.stringify(vm.players));

		/*
			confronto i punteggi dei vari giocatori, e in caso di una diffenza di 60 punti, mando una notifica su slack
		*/ 
		if (vm.arrayScore.length >= vm.totPlayers) {
			vm.arrayScore = [];
		}
		else {
			vm.arrayScore.push(vm.currentScore);
			vm.arrayScore.sort();
			if (vm.arrayScore[vm.arrayScore.length-1] - vm.arrayScore[0] >= 60) {
		
			$.post("https://hooks.slack.com/services/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" ,{
				'payload' : '{"text": "I\'m winning :P"}'
			});
		
			}
		}

		/*
		ad ogni click aggiorno il nome e punteggio del giocatore, quando tutti i giocatori hanno lanciato,
		aggiorno il anche il numero del round
		*/

		if(i != 0) {
			i--;
			vm.currentPlayer = vm.players[i].name;
			vm.currentScore = vm.players[i].totScore;
		}
		else{
			vm.rounds += 1;
			i = vm.totPlayers - 1;
			vm.currentPlayer = vm.players[i].name;
			vm.currentScore = vm.players[i].totScore;
		}
	}


/*

	dovrei trasformare le 3 funzioni addScore in 1 !!!

*/

	/*
		ogni volta che si clicca il pulsante + dell'input, aggiorno il punteggio, e disattivo il pulsante
		-in caso il punteggio è 0 si vince e viene inviata la notifica su slack
		-se il punteggio del lancio è maggiore del punteggio corrente, allora il round del giocatore finisce,
		disattivando i pulsanti + attivi
	*/

	vm.addScore1 = function() {
		currentShot = 0;
		vm.buttonClicked1 = true;
		vm.scoreRound += parseInt(vm.fShot);
		currentShot = parseInt(vm.fShot);
		vm.currentScore -= currentShot;
		if (vm.currentScore == 0) {
		
			$.post("https://hooks.slack.com/services/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" ,{
				'payload' : '{"text": "I won :)"}'
			});
		
			vm.win = true;
			vm.congratulations = "Complimenti sei il vincitore!!!";
		}
		if (vm.currentScore < 0) {
			vm.currentScore += currentShot;
			vm.scoreRound = 0;
			vm.buttonClicked2 = true;
			vm.buttonClicked3 = true;
		}

	}

	vm.addScore2 = function() {
		currentShot = 0;
		vm.buttonClicked2 = true;
		vm.scoreRound += parseInt(vm.sShot);
		currentShot = parseInt(vm.sShot);
		vm.currentScore -= currentShot;
		if (vm.currentScore == 0) {
		
			$.post("https://hooks.slack.com/services/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" ,{
				'payload' : '{"text": "I won :)"}'
			});
		
			vm.win = true;
			vm.congratulations = "Complimenti sei il vincitore!!!";
		}
		if (vm.currentScore < 0) {
			vm.currentScore += currentShot;
			vm.scoreRound = 0;
			vm.buttonClicked3 = true;
		}

	}

	vm.addScore3 = function() {
		currentShot = 0;
		vm.buttonClicked3 = true;
		vm.scoreRound += parseInt(vm.tShot);
		currentShot = parseInt(vm.tShot);
		vm.currentScore -= currentShot;
		if (vm.currentScore == 0) {
		
			$.post("https://hooks.slack.com/services/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" ,{
				'payload' : '{"text": "I won :)"}'
			});
		
			vm.win = true;
			vm.congratulations = "Complimenti sei il vincitore!!!";
		}
		if (vm.currentScore < 0) {
			vm.currentScore += currentShot;
			vm.scoreRound = 0;
		}

	} 

	//Ripulisce le input dopo ogni click
	var clearInput = function() {
		vm.fShot = '';
		vm.sShot = '';
		vm.tShot = '';
	};

}]);
