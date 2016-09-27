'use strict';

angular.module('app.win')

.controller('winCtrl', ['$localStorage', function($localStorage) {
  var vm = this;     
  vm.selectedPlayers = $localStorage.selectedPlayers;
  vm.indexCurrentPlayer = $localStorage.indexCurrentPlayer;
}]);
