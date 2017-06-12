'use strict';

angular
  .module('app')
  /**
   * @ngdoc controller
   * @name app.playersSelection.controller:PlayersSelectionController
   * @description
   * Controller for the players selection component.
   */
  .controller('PlayersSelectionController', [
    'SavedPlayers',
    'SelectedPlayers',
    'PlayersFactory',
    function(SavedPlayers, SelectedPlayers, PlayersFactory) {
      var ctrl = this;

      // Exposes public methods
      ctrl.addNewPlayer = addNewPlayer;
      ctrl.deselectPlayer = deselectPlayer;
      ctrl.isPlayerSelected = isPlayerSelected;
      ctrl.selectPlayer = selectPlayer;
      ctrl.togglePlayer = togglePlayer;

      /**
       * @ngdoc property
       * @name PlayersSelectionController#savedPlayers
       * @type {Object}
       * @propertyOf app.playersSelection.controller:PlayersSelectionController
       */
      ctrl.savedPlayers = SavedPlayers;

      /**
       * @ngdoc property
       * @name PlayersSelectionController#selectedPlayers
       * @type {Object}
       * @propertyOf app.playersSelection.controller:PlayersSelectionController
       */
      ctrl.selectedPlayers = SelectedPlayers;

      /**
       * @ngdoc method
       * @name PlayersSelectionController#isPlayerSelected
       * @kind function
       * @methodOf app.playersSelection.controller:PlayersSelectionController
       * @param {Object} player The given player
       * @return {boolean} True if the given player has been already selected.
       * @description
       * Determines if the give player has been already selected or not.
       */
      function isPlayerSelected(player) {
        return ctrl.selectedPlayers.isAdded(player);
      }

      /**
       * @ngdoc method
       * @name PlayersSelectionController#togglePlayer
       * @kind function
       * @methodOf app.playersSelection.controller:PlayersSelectionController
       * @param {Object} player The given player
       * @description
       * Add/remove selection from the give player.
       */
      function togglePlayer(player) {
        if (ctrl.isPlayerSelected(player)) {
          ctrl.deselectPlayer(player);
        }
        else {
          ctrl.selectPlayer(player);
        }
      }

      /**
       * @ngdoc method
       * @name PlayersSelectionController#deselectPlayer
       * @kind function
       * @methodOf app.playersSelection.controller:PlayersSelectionController
       * @param {Object} player The player to remove from the selected players list.
       * @description
       * Remove the given player from the selected players list.
       */
      function deselectPlayer(player) {
        ctrl.selectedPlayers.remove(player);
      }

      /**
       * @ngdoc method
       * @name PlayersSelectionController#selectPlayer
       * @kind function
       * @methodOf app.playersSelection.controller:PlayersSelectionController
       * @param {Object} player The player to add into the selected players list.
       * @description
       * Add the given player into the selected players list.
       */
      function selectPlayer(player) {
        ctrl.selectedPlayers.add(player);
      }

      /**
       * @ngdoc method
       * @name PlayersSelectionController#addNewPlayer
       * @kind function
       * @methodOf app.playersSelection.controller:PlayersSelectionController
       * @description
       * Creates a new player and adds it into:
       * - selected players list
       * - saved players list
       */
      function addNewPlayer() {
        var newPlayerName = prompt("New player's name:");
        if (newPlayerName != null && newPlayerName != "") {
          var newPlayer = PlayersFactory.create(newPlayerName, ctrl.savedPlayers.getAll());
          ctrl.selectPlayer(newPlayer);
          ctrl.savedPlayers.add(newPlayer);
        }
      }
    }
  ]);
