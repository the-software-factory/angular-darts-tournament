'use strict';

function ShowPlayersController($element, SavedPlayers, SelectedPlayers, PlayersFactory) {
  var ctrl = this;

  // Exposes public methods
  ctrl.addNewPlayer = addNewPlayer;
  ctrl.deselectPlayer = deselectPlayer;
  ctrl.isPlayerSelected = isPlayerSelected;
  ctrl.selectPlayer = selectPlayer;
  ctrl.togglePlayer = togglePlayer;

  /**
   * @ngdoc property
   * @name ShowPlayersController#savedPlayers
   * @type {Object}
   * @propertyOf app.showPlayers.controller:ShowPlayersController
   */
  ctrl.savedPlayers = SavedPlayers;

  /**
   * @ngdoc property
   * @name ShowPlayersController#selectedPlayers
   * @type {Object}
   * @propertyOf app.showPlayers.controller:ShowPlayersController
   */
  ctrl.selectedPlayers = SelectedPlayers;

  /**
   * @ngdoc method
   * @name ShowPlayersController#isPlayerSelected
   * @kind function
   * @methodOf app.showPlayers.controller:ShowPlayersController
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
   * @name PlayersController#togglePlayer
   * @kind function
   * @methodOf app.players.controller:PlayersController
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
   * @name PlayersController#deselectPlayer
   * @kind function
   * @methodOf app.players.controller:PlayersController
   * @param {Object} player The player to remove from the selected players list.
   * @description
   * Remove the given player from the selected players list.
   */
  function deselectPlayer(player) {
    ctrl.selectedPlayers.remove(player);
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
    ctrl.selectedPlayers.add(player);
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
    if (ctrl.newPlayerName) {
      var newPlayer = PlayersFactory.create(ctrl.newPlayerName, ctrl.savedPlayers.getAll());
      ctrl.newPlayerName = null;
      ctrl.selectPlayer(newPlayer);
      ctrl.savedPlayers.add(newPlayer);
    }
    else {
      $element.find('input').focus();
    }
  }
}

angular
  .module('app')
  /**
   * @ngdoc component
   * @name app.component:showPlayers
   * @description
   * Visualizes created players names and icons.
   */
  .component('showPlayers', {
    templateUrl: 'app/components/show-players/show-players.view.html',
    controller: ['$element', 'SavedPlayers', 'SelectedPlayers', 'PlayersFactory', ShowPlayersController]
  });