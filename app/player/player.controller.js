'use strict';

angular.module('app.player')

.controller('playerCtrl', ['$localStorage', function($localStorage) {
	var vm = this;
	//Array with all players ready to start the game
	vm.players = [];
	//Array with VIP players
	vm.storagePlayers = [];

	vm.savedStorage = $localStorage.storagePlayers = $localStorage.storagePlayers || [];

	// load the VIP players in the table
	if (vm.savedStorage !== null) {
		vm.storagePlayers = vm.savedStorage;
	}

	// add player with a name, and a initial score
	vm.addPlayer = function() {
		vm.players.push({ 
			'name':vm.name,
			'totScore':501
		});
  	vm.name = ''; //clear input
	  //save the last player
		var currentPlayerSaved = {};
	  currentPlayerSaved = vm.players[vm.players.length - 1]; 
	  vm.storagePlayers.push(currentPlayerSaved); //add player in the VIP array
	  $localStorage.players = vm.players;
	  $localStorage.storagePlayers = vm.storagePlayers;
	};

	//remove all players in the list
	vm.removeAllPlayers = function() {
		vm.players = [];
		$localStorage.players = vm.players;
	};

	// remove only the VIP player selected
	vm.removePlayerStorage = function(friend) {
		var index = vm.storagePlayers.indexOf(friend);
		vm.storagePlayers.splice(index, 1);
		$localStorage.storagePlayers = vm.storagePlayers;
	};

	//take the selected VIP player from table and put it in the list of player
	vm.addPlayerInList = function(friend) {
		vm.buttonAddPlayerTable = true;
		vm.players.push(friend);
		$localStorage.players = vm.players;
	};
}]);
