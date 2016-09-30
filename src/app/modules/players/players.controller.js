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

      // TODO Add docblock
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
        return vm.adapter.getSelectedPlayers().indexOf(player) >= 0;
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

      // TODO Add docblock
      function deselectPlayer(player) {
        var selectedPlayers = vm.adapter.getSelectedPlayers();
        var offset = selectedPlayers.indexOf(player);
        selectedPlayers.splice(offset, 1);
        vm.adapter.persistSelectedPlayers(selectedPlayers);
      }

      // TODO Add docblock
      function selectPlayer(player) {
        var selectedPlayers = vm.adapter.getSelectedPlayers();
        selectedPlayers.push(player);
        vm.adapter.persistSelectedPlayers(selectedPlayers);
      }

      // TODO Add docblock
      // TODO Refactor this function
      function addNewPlayer() {
        if (vm.newPlayerName) {
          var newPlayer = PlayerFactory.create(vm.newPlayerName);
          vm.newPlayerName = null;

          var selectedPlayers = vm.adapter.getSelectedPlayers();
          selectedPlayers.push(newPlayer);
          vm.adapter.persistSelectedPlayers(selectedPlayers);

          var savedPlayers = vm.adapter.getSavedPlayers();
          savedPlayers.push(newPlayer);
          vm.adapter.persistSavedPlayers(savedPlayers);
        }
      }

    }
  ]);
