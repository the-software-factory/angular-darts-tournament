'use strict';

angular
//  .module('app.prizegiving')
  .module('app')
  /**
   * @ngdoc controller
   * @name app.prizegiving.controller:PrizegivingController
   * @description
   * The controller for the prizegiving page.
   */
  .controller('PrizegivingController', [
    '$location',
    'Match',
    function($location, Match) {
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
