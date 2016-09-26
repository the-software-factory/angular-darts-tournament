'use strict';

angular.module('app.round')

.controller('roundCtrl', ['$localStorage', function($localStorage) {
  var vm = this;

  vm.nextShot = nextShot;
  vm.nextPlayer = nextPlayer;
  vm.nextRound = nextRound;
  vm.addShotScore = addShotScore;
  vm.deleteShotScore = deleteShotScore;

  vm.selectedPlayers = $localStorage.selectedPlayers; // load selected players
 
  vm.rounds = $localStorage.rounds; // load the list of the rounds
  
  vm.indexCurrentPlayer = $localStorage.indexCurrentPlayer; // load the index of the next player
  
  vm.shotNumber = $localStorage.shotNumber; //load a value, previously initialized to zero, used to track the number of the shot in the round

  vm.shotsScores = ['-', '-', '-']; // initialize the 3-length array which contains the score of each single shot per round (every player has 3 shot each round)

  vm.totalScoreOfRound = 0; // the value of the sum of the 3 shots each round (initialized to 0)

  vm.isPointButtonsClickable = false;

  function nextShot() {
    vm.shotNumber++; 
    if (vm.shotNumber > 2) { //tiri finiti, prossimo giocatore (prima aggiungo il punteggo totale del round, e riporto a 0 lo shotNumber)
      var oldScore = vm.selectedPlayers[vm.indexCurrentPlayer].scores.pop();
      vm.selectedPlayers[vm.indexCurrentPlayer].scores.push(oldScore);
      vm.selectedPlayers[vm.indexCurrentPlayer].scores.push(oldScore - vm.totalScoreOfRound);
      vm.shotNumber = 0;
      vm.nextPlayer();
    } 
    else { //ancora tiri disponibili
      vm.isPointButtonsClickable = false;
      window.location = '#!/round';
    }
  }

  function nextPlayer() {
    vm.indexCurrentPlayer++;
    $localStorage.indexCurrentPlayer = vm.indexCurrentPlayer;
    if (vm.indexCurrentPlayer >= vm.selectedPlayers.length) { //giocatori finiti, prossimo turno
      $localStorage.indexCurrentPlayer = 0;
      vm.nextRound();
    } 
    else { //ci sono giocatori che devono finire il turno corrente
      vm.isPointButtonsClickable = false;
      window.location = '#!/score';
    }
  }

  function nextRound() {
    vm.rounds.push('Round ' + vm.rounds.length);
    window.location = '#!/score';
  }

  /* Add the score of single shot */
  function addShotScore(score) {
    if (!vm.isPointButtonsClickable) {
      vm.isPointButtonsClickable = true;
      vm.shotsScores[vm.shotNumber] = score;
      vm.totalScoreOfRound += score;
    }
  }

  /* Delete the last shot score */
  function deleteShotScore() {
    vm.totalScoreOfRound -= vm.shotsScores[vm.shotNumber];
    vm.shotsScores[vm.shotNumber] = '-';
    vm.isPointButtonsClickable = false;
  }
}]);
