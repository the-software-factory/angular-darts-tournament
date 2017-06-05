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
    '$scope',
    '$location',
    'SavedPlayers',
    'SelectedPlayers',
    'Match',
    function($scope, $location, SavedPlayers, SelectedPlayers, Match) {
      var vm = this;

      // Exposes public methods
      vm.startMatch = startMatch;
      vm.areSelectedPlayersEnough = areSelectedPlayersEnough;

      /*
       * @ngdoc property
       * @name PlayersController#savedPlayers
       * @type {Object}
       * @propertyOf app.players.controller:PlayersController
       */
      vm.savedPlayers = SavedPlayers;

      /*
       * @ngdoc property
       * @name PlayersController#selectedPlayers
       * @type {Object}
       * @propertyOf app.players.controller:PlayersController
       */
      vm.selectedPlayers = SelectedPlayers;

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
        return vm.selectedPlayers.getAll().length >= Match.getMinimumNumberOfPlayers();
      }

      /**
       * @ngdoc method
       * @name PlayersController#start
       * @kind function
       * @methodOf app.players.controller:PlayersController
       * @description
       * Creates a new match. This will define a new initial round where all selected players have the initial score.
       */
      function startMatch() {
        Match.reset();
        $location.path('summary/round/1/player/' + Match.getNextPlayer(1).id);
      }

    }
  ]);