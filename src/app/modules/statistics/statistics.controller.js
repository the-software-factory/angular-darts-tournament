'use strict';

angular
  .module('app.statistics')
  .controller('StatisticsController', [
    '$location',
    'SavedPlayers',
    'PlayerStats',
    function($location, SavedPlayers, PlayerStats) {

      var vm = this;

      vm.savedPlayers = SavedPlayers;
      vm.playerStats = PlayerStats;

      // Exposes public methods
      vm.viewPlayers = viewPlayers;

      function viewPlayers() {
        $location.path('players');
      }

    }
  ]);