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
    'Match',
    'Storage',
    function(SelectedPlayers, Match, Storage) {
      var vm = this;

      // Exposes public methods
      vm.getPlayers = getPlayers;
      vm.getMissingPoints = getMissingPoints;

      /**
       * @ngdoc property
       * @name SummaryController#match
       * @type {Object}
       * @propertyOf app.players.controller:SummaryController
       */
      vm.match = Match;

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
       * @name SummaryController#getMissingPoints
       * @kind function
       * @methodOf app.players.controller:SummaryController
       * @return {number|undefined} The missing points of the given player after selected round.
       * @description
       * Returns the missing points of the selected player after the given round.
       */
      function getMissingPoints(player, round) {
        // FIXME of course it does not work but it's only a first step to see the points of the specific round.
        if (round[player.id].points) {
          return round[player.id].points;
        }
      }

    }
  ]);
