'use strict';

angular.module('app.player')

.controller('playerCtrl', [function() {
	var vm = this;

	//Array with all players
	vm.players = [];
	//Array with bookmark players
	vm.storagePlayers = [];
	//save the last player
	var currentPlayerSaved = {};
	//the button for add player in the table of players is abilited

	vm.buttonAddPlayerTable = false;

	vm.saved = localStorage.getItem('players');
	vm.savedStorage = localStorage.getItem('storagePlayers');

	// load the bookmark players in the table
	if (localStorage.getItem('storagePlayers') !== null) {
		vm.storagePlayers = JSON.parse(vm.savedStorage);
	}

	//vm.storagePlayers = []; //for debug -> remove all players saved

	localStorage.setItem('players', JSON.stringify(vm.players));
	localStorage.setItem('storagePlayers', JSON.stringify(vm.storagePlayers));

	// add player with a name, and a initial score
	vm.addPlayer = function() {
		vm.players.push({ 
			'name':vm.name,
			'totScore':501
		});
  vm.name = ''; //clear input
  currentPlayerSaved = vm.players[vm.players.length - 1]; 
  vm.storagePlayers.push(currentPlayerSaved); //add player in the bookmark
  localStorage.setItem('players', JSON.stringify(vm.players));
  localStorage.setItem('storagePlayers', JSON.stringify(vm.storagePlayers));

	};

	//remove all players in the list
	vm.removePlayer = function() {
		vm.players = [];
		localStorage.setItem('players', JSON.stringify(vm.players));
	};

	// remove the player in the table (where there are all players saved)
	vm.removePlayerStorage = function(friend) {
		var index = vm.storagePlayers.indexOf(friend);
		vm.storagePlayers.splice(index, 1);
		localStorage.setItem('storagePlayers', JSON.stringify(vm.storagePlayers));
	};
	
	//take a player from table and put it in the list of player
	vm.addPlayerInList = function(friend) {
		vm.buttonAddPlayerTable = true;
		vm.players.push(friend);
		localStorage.setItem('players', JSON.stringify(vm.players));
	};

}]);
