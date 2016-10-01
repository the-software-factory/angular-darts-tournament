'use strict';

angular
  .module('app.summary')
  /**
   * @ngdoc controller
   * @name app.players.controller:SummaryController
   * @description
   * The controller for the summary page.
   */
  .controller('SummaryController', [
    'SelectedPlayers',
    'Storage',
    function(SelectedPlayers, Storage) {
      var vm = this;

      // Exposes public methods
      vm.getPlayers = getPlayers;
      vm.getPoints = getPoints;
      vm.getRounds = getRounds;

      /**
       * @ngdoc method
       * @name SummaryController#getPlayers
       * @kind function
       * @methodOf app.players.controller:SummaryController
       * @return {Array} The selected players.
       * @description
       * Returns all selected players.
       */
      function getPlayers() {
        return SelectedPlayers.get();
      }

      /**
       * @ngdoc method
       * @name SummaryController#getRounds
       * @kind function
       * @methodOf app.players.controller:SummaryController
       * @return {Array} The list of rounds.
       * @description
       * Returns all rounds.
       */
      function getRounds() {
        // TODO we should use a service for this
        return Storage.get('rounds') || [];
      }

      /**
       * @ngdoc method
       * @name SummaryController#getPoints
       * @kind function
       * @methodOf app.players.controller:SummaryController
       * @return {number} The missing points of the given player after selected round.
       * @description
       * Returns the missing points of the selected player after the given round.
       */
      function getPoints(player, round) {
        // TODO we should use a service for this
        return round[player.id].missingPoint;
      }

    }
  ]);
