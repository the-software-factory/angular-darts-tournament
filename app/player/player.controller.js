'use strict';

angular.module('app.player')

.controller('playerCtrl', ['$localStorage', function($localStorage) {
  var vm = this;
  var minNumPlayersForTournament = 2; // minimum number of players to start a tournament
  
  vm.addPlayer = addPlayer;
  vm.addPlayerButtonClicked = addPlayerButtonClicked;
  vm.togglePlayer = togglePlayer;
  vm.startTournament = startTournament;
  
  vm.isAddPlayerButtonClicked = false; // addButton is initially visibile and not clicked

  vm.storagePlayers = []; // array with VIP players
  
  vm.selectedPlayers = []; // array with selected players

  vm.savedStorage = $localStorage.storagePlayers = $localStorage.storagePlayers || [];
  
  vm.storagePlayers = vm.savedStorage; // load the VIP players in the table
  
  vm.isStartButtonVisible = false; //controls the shown of start button
  
  /* add player with a name, initial score and state (selected or not) */
  function addPlayer() {
    vm.storagePlayers.push({ 
      'name':vm.name,
      'scores':[201],
      'selected':false
    });
    vm.name = ''; // clear input
    $localStorage.storagePlayers = vm.storagePlayers;
    vm.isAddPlayerButtonClicked = false; // when a player has been added, addButton has to be visibile
  }

  /* sets the value of isAddButtonClicked on true when addButton is clicked */
  function addPlayerButtonClicked() {
    vm.isAddPlayerButtonClicked = true;
  }

  /* put or remove the vip player in the list of selected player */
  function togglePlayer(friend) {
    var index = vm.selectedPlayers.indexOf(friend);
    friend.scores = [201];
    if (index == -1)  // select
      vm.selectedPlayers.push(friend);
    else  // deselect
      vm.selectedPlayers.splice(index, 1);
    friend.selected = !friend.selected;
    $localStorage.selectedPlayers = vm.selectedPlayers; 
    
    vm.isStartButtonVisible = false;
    if (vm.selectedPlayers.length >= minNumPlayersForTournament)
      vm.isStartButtonVisible = true;
  }

  /* brings back to false the state (selected or not) of the selected players */
  function startTournament() {
    $localStorage.rounds = ['Start'];
    $localStorage.indexCurrentPlayer = 0;
    $localStorage.shotNumber = 0;
    for (var i in vm.selectedPlayers)
      vm.selectedPlayers[i].selected = false;
  }
}]);
