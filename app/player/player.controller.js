'use strict';

angular.module('app.player')

.controller('playerCtrl', ['$localStorage', function($localStorage) {
    var vm = this;
    var a = 2; //minimum number of players to start a tournamen
    vm.addPlayer = addPlayer;
    vm.addPlayerClicked = addPlayerClicked;
    vm.togglePlayer = togglePlayer;
    vm.start = start;
    vm.isStartButtonVisible = isStartButtonVisible;

    // addButton is initially visibile and not clicked
    vm.isAddButtonClicked = false; 

    // array with VIP players
    vm.storagePlayers = [];
    // array with selected players
    vm.selectedPlayers = [];

    vm.savedStorage = $localStorage.storagePlayers = $localStorage.storagePlayers || [];

    // load the VIP players in the table
    if (vm.savedStorage !== null) {
        vm.storagePlayers = vm.savedStorage;
    }

    // add player with a name, initial score and state (selected or not)
    function addPlayer() {

        vm.storagePlayers.push({ 
            'name':vm.name,
            'totScore':201,
            'selected':false
        });
    vm.name = ''; // clear input
    $localStorage.storagePlayers = vm.storagePlayers;
    vm.isAddButtonClicked = false; // when a player has been added, addButton has to be visibile
    };

    // sets the value of isAddButtonClicked on true when addButton is clicked
    function addPlayerClicked() {
        vm.isAddButtonClicked = true;
    };

    // put or remove the vip player in the list of selected player
    function togglePlayer(friend) {
        var index = vm.selectedPlayers.indexOf(friend);
    if(index == -1)  // select
        vm.selectedPlayers.push(friend);
    else  // deselect
        vm.selectedPlayers.splice(index, 1);
    friend.selected =! friend.selected;
    $localStorage.selectedPlayers=vm.selectedPlayers;
    };

    // brings back to false the state (selected or not) of the selected players
    function start() {
            $localStorage.rounds = ['Start'];
            $localStorage.indexCurrentPlayer = 0;
            $localStorage.shotNumber = 0;
        for(var i in vm.selectedPlayers)
            vm.selectedPlayers[i].selected = false;
    };

    // controls the shown of start button
    function isStartButtonVisible() {
        var startButton = false;
        if (vm.selectedPlayers.length >= a)
            startButton = true;
        return startButton;
    }
}]);
