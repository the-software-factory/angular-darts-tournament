'use strict';

angular.module('app.round')

.controller('roundCtrl', ['$localStorage', function($localStorage) {
    var vm = this;

    vm.nextShot = nextShot;
    vm.nextPlayer = nextPlayer;
    vm.nextRound = nextRound;
    vm.addScore = addScore;

    // load selected players
    vm.selectedPlayers = $localStorage.selectedPlayers;
    
    // load the list of the rounds
    vm.rounds = $localStorage.rounds;
    
    // load the index of the next player
    vm.indexCurrentPlayer = $localStorage.indexCurrentPlayer;

    //load a value, previously initialized to zero, used to track the number of the shot on the round
    vm.shotNumber = $localStorage.shotNumber;
    
    function nextShot() {
        vm.shotNumber++; 
        if (vm.shotNumber > 2) { //tiri finiti, prossimo giocatore (prima passa alla schermata)
            vm.shotNumber = 0;
            vm.nextPlayer();
        } else{ //ancora tiri disponibili
            window.location = '#!/round';
        }
    };

    function nextPlayer() {
        vm.indexCurrentPlayer++;
        $localStorage.indexCurrentPlayer = vm.indexCurrentPlayer;
        if (vm.indexCurrentPlayer >= vm.selectedPlayers.length) { //giocatori finiti, prossimo turno
            $localStorage.indexCurrentPlayer = 0;
            vm.nextRound();
        } else { //ci sono giocatori che devono finire il turno corrente
            window.location = '#!/score';
        }
    };

    function nextRound(){
        vm.rounds.push('Round '+ vm.rounds.length);
        window.location = '#!/score';
    };

    function addScore(score){
        /*
        Not implemented yet

        vm.selectedPlayers[vm.indexCurrentPlayer].totScore -= score;
        window.alert(vm.selectedPlayers[vm.indexCurrentPlayer].totScore);
        */
    };
}]);
