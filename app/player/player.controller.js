'use strict';

angular.module('app.player')

.controller('playerCtrl', ['$localStorage', function($localStorage) {
	var addButtonClicked = false;
	var vm = this;
	//Array with all players ready to start the game
	//vm.players = [];
	
	//Array with VIP players
	vm.storagePlayers = [];
	//Selected players
	vm.selectedPlayers = [];
	vm.savedStorage = $localStorage.storagePlayers = $localStorage.storagePlayers || [];

	// load the VIP players in the table
	if (vm.savedStorage !== null) {
		vm.storagePlayers = vm.savedStorage;
	}

	// add player with a name, and a initial score
	vm.addPlayer = function() {
		
		vm.storagePlayers.push({ 
			'name':vm.name,
			'totScore':201,
			'selected':false
		});
		//vm.name = ''; //clear input
		//save the last player
		//var currentPlayerSaved = {};
		//currentPlayerSaved = vm.players[vm.players.length - 1]; 
		//vm.storagePlayers.push(currentPlayerSaved); //add player in the VIP array
		//$localStorage.players = vm.players;
		$localStorage.storagePlayers = vm.storagePlayers;
		addButtonClicked = false;
	};

	//remove all players in the list
	/*vm.removeAllPlayers = function() {
		vm.players = [];
		$localStorage.players = vm.players;
	};*/

	// remove only the VIP player selected
	/*vm.removePlayerStorage = function(friend) {
		var index = vm.storagePlayers.indexOf(friend);
		vm.storagePlayers.splice(index, 1);
		$localStorage.storagePlayers = vm.storagePlayers;
	};*/

	//take the selected VIP player from table and put it in the list of player
	/*vm.addPlayerInList = function(friend) {
		vm.buttonAddPlayerTable = true;
		vm.players.push(friend);
		$localStorage.players = vm.players;
	};*/

	vm.addPlayerClicked = function() {
		addButtonClicked = true;
	};

	vm.isAddPlayerClicked = function() {
		return addButtonClicked;  
	};

	vm.slectDeselectPlayer = function(friend) {
		var index = vm.selectedPlayers.indexOf(friend);
		if(index == -1)  //select
			vm.selectedPlayers.push(friend);
		else  //deselect
			vm.selectedPlayers.splice(index, 1);
		friend.selected=!friend.selected;
		//$localStorage.selectedPlayers = vm.selectedPlayers;
	};

	vm.start = function() {
	for(var i in vm.selectedPlayers)
		vm.selectedPlayers[i].selected=false;
	};


}]);
