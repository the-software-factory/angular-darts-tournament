'use strict';

angular.module('app.score')

.controller('scoreCtrl', ['$localStorage', function($localStorage) {
    var vm = this;
    // load selected players
    vm.selectedPlayers = $localStorage.selectedPlayers;
    
    // load the list of the rounds
    vm.rounds = $localStorage.rounds;
    
    // load the index of the next player
    vm.indexCurrentPlayer = $localStorage.indexCurrentPlayer;
    
    /*vm.rounds.push('Round 1')
    window.alert(vm.rounds[vm.rounds.length-1]);*/
}]);
