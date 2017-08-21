'use strict';

angular
  .module('app.prizegiving')
  /**
   * @ngdoc controller
   * @name app.prizegiving.controller:PrizegivingController
   * @description
   * The controller for the prizegiving page.
   */
  .controller('PrizegivingController', [
    '$location',
    'Match',
    'SelectedPlayers',
    'PlayerStats',
    function($location, Match, SelectedPlayers, PlayerStats) {
      var vm = this;

      // Exposes public methods
      vm.newMatch = newMatch;

      /**
       * @ngdoc property
       * @name SummaryController#match
       * @type {Object}
       * @propertyOf app.summary.controller:SummaryController
       */
      vm.match = Match;

      vm.selectedPlayers = SelectedPlayers;

      vm.playerStats = PlayerStats;

      /**
       * @ngdoc method
       * @name PrizegivingController#newMatch
       * @kind function
       * @methodOf app.prizegiving.controller:PrizegivingController
       * @description
       * Redirects user to the players page to select them to start a new match
       */
      function newMatch() {
        $location.path('players');
      }

    }
  ]);
