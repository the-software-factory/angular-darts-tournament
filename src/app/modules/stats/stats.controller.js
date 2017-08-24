'use strict';

angular
  .module('app.stats')
  .controller('StatsController', [
    '$location',
    'SavedPlayers',
    'PlayerStats',
    function($location, SavedPlayers, PlayerStats) {

      var vm = this;

      /**
       * @ngdoc property
       * @name StatsController#savedPlayers
       * @type {Object}
       * @propertyOf app.stats.controller:StatsController
       */
      vm.savedPlayers = SavedPlayers;

      /**
       * @ngdoc property
       * @name StatsController#playerStats
       * @type {Object}
       * @propertyOf app.stats.controller:StatsController
       */
      vm.playerStats = PlayerStats;

      // Exposes public methods
      vm.viewPlayers = viewPlayers;

      /**
       * @ngdoc method
       * @name StatsController#viewPlayers
       * @kind function
       * @methodOf app.stats.controller:StatsController
       * @description
       * Navigates to the players view.
       */
      function viewPlayers() {
        $location.path('players');
      }

    }
  ]);
