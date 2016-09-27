'use strict';

angular.module('app.score')

.controller('scoreCtrl', ['$localStorage', function($localStorage) {
  var vm = this;     
  vm.selectedPlayers = $localStorage.selectedPlayers; // load selected players
    
  vm.rounds = $localStorage.rounds; // load the list of the rounds
    
  vm.indexCurrentPlayer = $localStorage.indexCurrentPlayer; // load the index of the next player
    
    /*vm.rounds.push('Round 1')
    window.alert(vm.rounds[vm.rounds.length-1]);*/
}]);
