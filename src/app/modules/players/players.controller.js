'use strict';

angular
  .module('app.players')
  /**
   * @ngdoc controller
   * @name app.players.controller:PlayersController
   * @description
   * The controller for the players list.
   */
  .controller('PlayersController', [
    'PlayersAdapter',
    'PlayerFactory',
    function(PlayersAdapter, PlayerFactory) {
      var vm = this;

      // Exposes public methods
      vm.addNewPlayer = addNewPlayer;
      vm.areSelectedPlayersEnough = areSelectedPlayersEnough;
      vm.deselectPlayer = deselectPlayer;
      vm.isPlayerSelected = isPlayerSelected;
      vm.selectPlayer = selectPlayer;
      vm.togglePlayer = togglePlayer;

      /**
       * @ngdoc property
       * @name PlayersController#adapter
       * @type {Object}
       * @propertyOf app.players.controller:PlayersController
       */
      vm.adapter = PlayersAdapter;

      /**
       * @ngdoc method
       * @name PlayersController#isPlayerSelected
       * @kind function
       * @methodOf app.players.controller:PlayersController
       * @param {Object} player The given player
       * @return {boolean} True if the given player has been already selected.
       * @description
       * Determines if the give player has been already selected or not.
       */
      function isPlayerSelected(player) {
        var isPlayerSelected = false;
        angular.forEach(vm.adapter.getSelectedPlayers(), function(selectedPlayer) {
          if (selectedPlayer.id === player.id) {
            isPlayerSelected = true;
          }
        });
        return isPlayerSelected;
      }

      /**
       * @ngdoc method
       * @name PlayersController#togglePlayer
       * @kind function
       * @methodOf app.players.controller:PlayersController
       * @param {Object} player The given player
       * @description
       * Add/remove selection from the give player.
       */
      function togglePlayer(player) {
        if (vm.isPlayerSelected(player)) {
          vm.deselectPlayer(player);
        }
        else {
          vm.selectPlayer(player);
        }
      }

      /**
       * @ngdoc method
       * @name PlayersController#areSelectedPlayersEnough
       * @kind function
       * @methodOf app.players.controller:PlayersController
       * @return {boolean} True if user selected enough players.
       * @description
       * Determines if user selected enough players to start match.
       */
      function areSelectedPlayersEnough() {
        return vm.adapter.getSelectedPlayers().length >= 2;
      }

      /**
       * @ngdoc method
       * @name PlayersController#deselectPlayer
       * @kind function
       * @methodOf app.players.controller:PlayersController
       * @param {Object} player The player to remove from the selected players list.
       * @description
       * Remove the given player from the selected players list.
       */
      function deselectPlayer(player) {
        var selectedPlayers = vm.adapter.getSelectedPlayers();
        var offset = selectedPlayers.indexOf(player);
        selectedPlayers.splice(offset, 1);
        vm.adapter.persistSelectedPlayers(selectedPlayers);
      }

      /**
       * @ngdoc method
       * @name PlayersController#selectPlayer
       * @kind function
       * @methodOf app.players.controller:PlayersController
       * @param {Object} player The player to add into the selected players list.
       * @description
       * Add the given player into the selected players list.
       */
      function selectPlayer(player) {
        var selectedPlayers = vm.adapter.getSelectedPlayers();
        selectedPlayers.push(player);
        vm.adapter.persistSelectedPlayers(selectedPlayers);
      }

      /**
       * @ngdoc method
       * @name PlayersController#addNewPlayer
       * @kind function
       * @methodOf app.players.controller:PlayersController
       * @description
       * Creates a new player and adds it into:
       * - selected players list
       * - saved players list
       */
      function addNewPlayer() {
        if (vm.newPlayerName) {
          var newPlayer = PlayerFactory.create(vm.newPlayerName);
          vm.newPlayerName = null;

          vm.selectPlayer(newPlayer);

          var savedPlayers = vm.adapter.getSavedPlayers();
          savedPlayers.push(newPlayer);
          vm.adapter.persistSavedPlayers(savedPlayers);
        }
      }

    }
  ]);
