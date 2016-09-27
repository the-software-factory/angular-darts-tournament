'use strict';

angular.module('app.round')

.controller('roundCtrl', ['$localStorage', function($localStorage) {
  var vm = this;

  nextShot = nextShot;
  nextPlayer = nextPlayer;
  nextRound = nextRound;
  vm.addShotScore = addShotScore;
  vm.deleteShotScore = deleteShotScore;
  setButtonDisabledProperty = setButtonDisabledProperty;
  resetScoreIfNegative = resetScoreIfNegative;
  vm.winCheck = winCheck;

  vm.selectedPlayers = $localStorage.selectedPlayers; // load selected players
 
  vm.rounds = $localStorage.rounds; // load the list of the rounds
  
  vm.indexCurrentPlayer = $localStorage.indexCurrentPlayer; // load the index of the current player
  
  var shotNumber = $localStorage.shotNumber; //load a value, previously initialized to zero, used to track the number of the shot in the round

  vm.shotsScores = ['-', '-', '-']; // initialize the 3-length array which contains the score of each shot per round (every player has 3 shot each round)

  vm.totalScoreOfRound = 0; // the value of the sum of the 3 shots each round (initialized to 0)

  var bonus = $localStorage.bonus; // used to double points and triple points 
  
  vm.buttonList = [];
  for (var buttonValue = 0; buttonValue <= 20; buttonValue++){
    vm.buttonList.push({  
      'value':buttonValue,  
      'disabled':false
    });
  }
  vm.buttonList.push({
    'value':25,
    'disabled':false
  });
  vm.buttonList.push({
    'value':50,
    'disabled':false
  });

  function nextShot() {
    shotNumber++;
    if (shotNumber > 2 || resetScoreIfNegative()) { //tiri finiti, prossimo giocatore (prima aggiungo il punteggo totale del round, e riporto a 0 lo shotNumber)
      var oldScore = vm.selectedPlayers[vm.indexCurrentPlayer].scores.pop();
      vm.selectedPlayers[vm.indexCurrentPlayer].scores.push(oldScore);
      vm.selectedPlayers[vm.indexCurrentPlayer].scores.push(oldScore - vm.totalScoreOfRound);
      shotNumber = 0;
      nextPlayer();
    } 
    else { //ancora tiri disponibili
      bonus = 1;
      setButtonDisabledProperty(false);
      window.location = '#!/round';
    }
  }

  function nextPlayer() {
    vm.indexCurrentPlayer++;
    $localStorage.indexCurrentPlayer = vm.indexCurrentPlayer;
    if (vm.indexCurrentPlayer >= vm.selectedPlayers.length) { //giocatori finiti, prossimo turno
      $localStorage.indexCurrentPlayer = 0;
      nextRound();
    } 
    else { //ci sono giocatori che devono finire il turno corrente
      setButtonDisabledProperty(false);
      window.location = '#!/score';
    }
  }

  function nextRound() {
    vm.rounds.push('Round ' + vm.rounds.length);
    window.location = '#!/score';
  }

  /* Add the score of single shot. index is the indiex of the clicked button in buttonList */
  function addShotScore(score, index) {
    if (!vm.buttonList[index].disabled) {
      setButtonDisabledProperty(true);
      vm.shotsScores[shotNumber] = bonus * score;
      vm.totalScoreOfRound += score;
      bonus++;
      if(bonus <= 3 && score <= 20)
        vm.buttonList[index].disabled = false;
      else 
        vm.buttonList[index].disabled = true;
    }
  }

  /* Delete the last shot score */
  function deleteShotScore() {
    if (vm.shotsScores[shotNumber] != '-') {
      vm.totalScoreOfRound -= vm.shotsScores[shotNumber];
      vm.shotsScores[vm.shotNumber] = '-';
      setButtonDisabledProperty(false);
      bonus = 1;
    }
  }

  function setButtonDisabledProperty(boolFlag) {
    var button;
    for(button of vm.buttonList)
      button.disabled = boolFlag;
  }

  function resetScoreIfNegative() {
      var oldScore = vm.selectedPlayers[vm.indexCurrentPlayer].scores.pop();
      vm.selectedPlayers[vm.indexCurrentPlayer].scores.push(oldScore);
    var flag = false;
    if ((oldScore - vm.totalScoreOfRound) < 0) {
      vm.totalScoreOfRound = 0;
      flag = true;
    }
    return flag;
  }

  function winCheck(){
    var oldScore = vm.selectedPlayers[vm.indexCurrentPlayer].scores.pop();
    vm.selectedPlayers[vm.indexCurrentPlayer].scores.push(oldScore);
    if ((oldScore - vm.totalScoreOfRound) == 0) {
      window.alert("VITTORIA");
      window.location = '#!/win';
    }
    else {
      nextShot();
    }
  }

}]);
