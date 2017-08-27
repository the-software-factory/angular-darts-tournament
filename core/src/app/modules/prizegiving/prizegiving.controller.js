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
    function($location, Match) {

      var vm = this;

      // Exposes public methods
      vm.newMatch = newMatch;
      vm.viewStats = viewStats;

      /**
       * @ngdoc property
       * @name PrizegivingController#match
       * @type {Object}
       * @propertyOf app.prizegiving.controller:PrizegivingController
       */
      vm.match = Match;

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

      /**
       * @ngdoc method
       * @name PrizegivingController#viewStats
       * @kind function
       * @methodOf app.prizegiving.controller:PrizegivingController
       * @description
       * Redirects user to the stats page
       */
      function viewStats() {
        $location.path('stats');
      }

    }
  ]);
