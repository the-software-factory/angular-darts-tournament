'use strict';

angular
  .module('app.summary')
  /**
   * @ngdoc controller
   * @name app.summary.controller:SummaryController
   * @description
   * The controller for the summary page.
   */
  .controller('SummaryController', [
    '$location',
    '$routeParams',
    'SelectedPlayers',
    'Match',
    'PlayerStats',
    'RULES',
    'Slack',
    function($location, $routeParams, SelectedPlayers, Match, PlayerStats, RULES, Slack) {
      var vm = this;

      // Exposes public methods
      vm.getPlayers = getPlayers;
      vm.getMissingPoints = getMissingPoints;
      vm.isMatchOver = isMatchOver;
      vm.isShutout = isShutout;
      vm.nextRound = nextRound;
      vm.prizegiving = prizegiving;
      vm.nextPlayer = nextPlayer;
      vm.saveIDRoundPlayer = saveIDRoundPlayer;
      /**
       * @ngdoc property
       * @name SummaryController#slack
       * @type {Object}
       * @propertyOf app.summary.controller:SummaryController
       */
      vm.slack = Slack;

      /**
       * @ngdoc property
       * @name SummaryController#match
       * @type {Object}
       * @propertyOf app.summary.controller:SummaryController
       */
      vm.match = Match;

      /**
       * @ngdoc property
       * @name SummaryController#playerID
       * @type {number}
       * @propertyOf app.summary.controller:SummaryController
       */
      vm.playerID = $routeParams.playerID;

      /**
       * @ngdoc property
       * @name SummaryController#round
       * @type {number}
       * @propertyOf app.summary.controller:SummaryController
       */
      vm.roundID = $routeParams.roundID;

      vm.saveIDRoundPlayer();
      /**
       * @ngdoc method
       * @name SummaryController#saveIDRoundPlayer
       * @kind function
       * @methodOf app.summary.controller:SummaryController
       * @description
       * Save the last roundID and playerID
       */
      function saveIDRoundPlayer() {
        //Save the last Round ID
        localStorage.setItem('saveRoundID', vm.roundID);

        //Save the last player ID
        localStorage.setItem('savePlayerID', vm.playerID);
      }
      
      /**
       * @ngdoc method
       * @name SummaryController#nextPlayer
       * @kind function
       * @methodOf app.summary.controller:SummaryController
       * @return {String} The name of next player.
       * @description
       * Return the next player that must play.
       */
      function nextPlayer() {
        return SelectedPlayers.getByID(localStorage.getItem('savePlayerID')).name;
      }

      /**
       * @ngdoc method
       * @name SummaryController#getPlayers
       * @kind function
       * @methodOf app.summary.controller:SummaryController
       * @return {Array} The selected players.
       * @description
       * Returns all selected players.
       */
      function getPlayers() {
        return SelectedPlayers.getAll();
      }

      /**
       * @ngdoc method
       * @name SummaryController#getMissingPoints
       * @kind function
       * @methodOf app.summary.controller:SummaryController
       * @return {number|undefined} The missing points of the given player after selected round.
       * @description
       * Returns the missing points of the selected player after the given round.
       */
      function getMissingPoints(player, round) {
        // 0 (zero) is a defined value.
        // If player played that round then a number exists
        if (angular.isNumber(vm.match.getRoundPointsByPlayer(player, round))) {
          return vm.match.getInitialPoints() - vm.match.getPointsUntilRound(player, round);
        }
        return;
      }

      /**
       * @ngdoc method
       * @name SummaryController#isShutout
       * @kind function
       * @methodOf app.summary.controller:SummaryController
       * @param TODO
       * @param TODO
       * @return {boolean} True if shutout is active
       * @description
       * Determines if the shutout is active.
       */
      function isShutout(player, round) {
        return vm.match.getRoundPointsByPlayer(player, round) != vm.match.getMaxPointsByRound(round) &&
          vm.match.getMaxPointsByRound(round) - vm.match.getRoundPointsByPlayer(player, round) >= RULES.SHUTOUT_POINTS &&
          vm.getMissingPoints(player, round) > (vm.match.getMaxPointsByRound(round) - RULES.SHUTOUT_POINTS);
      }

      /**
       * @ngdoc method
       * @name SummaryController#nextRound
       * @kind function
       * @methodOf app.summary.controller:SummaryController
       * @description
       * Go to the round view.
       */
      function nextRound() {
        $location.path('round/' + vm.roundID + '/player/' + vm.playerID);
      }

      /**
       * @ngdoc method
       * @name SummaryController#prizegiving
       * @kind function
       * @methodOf app.summary.controller:SummaryController
       * @description
       * Go to the prizegiving view, update the stats and send messages in Slack's chat.
       */
      function prizegiving() {
        // Check if the stats were already updated
        if (!PlayerStats.wereStatsUpdated()) {
          // Checks if a shutout has occurred during the match
          var rounds = Match.getRounds();
          angular.forEach(rounds, function(round) {
            angular.forEach(getPlayers(), function(player) {
              if (isShutout(player, rounds.indexOf(round))) {
                PlayerStats.addShutout(player);
                vm.slack.postShoutout(player);
              }
            });
          });
          // Updates games and wins properties of the players
          PlayerStats.updatePlayersGames();
          PlayerStats.savePlayers();
          vm.slack.postWinners(vm.match.getWinners());
        }
        $location.path('prizegiving');
      }

      /**
      * @ngdoc method
      * @name SummaryController#isMatchOver
      * @kind function
      * @methodOf app.summary.controller:SummaryController
      * @description
      * Defines if the match is over
      */
      function isMatchOver() {
        return vm.match.isMatchOver(vm.roundID - 1);
      }
    }
  ]);
