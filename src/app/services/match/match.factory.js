'use strict';

angular
  .module('app')
  /**
   * @ngdoc service
   * @name app.service:Match
   * @kind function
   * @description
   * Provides functions to handle a match.
   */
  .factory('Match', [
    'SelectedPlayers',
    'Storage',
    'RULES',
    function(SelectedPlayers, Storage, RULES) {

      /**
       * @ngdoc property
       * @name Match#currentPlayer
       * @private
       * @type {Object}
       * @propertyOf app.service:Match
       */
      var currentPlayer = null;

      /**
       * @ngdoc method
       * @private
       * @name Match#saveRounds
       * @propertyOf app.service:Match
       */
      var saveRounds = function(rounds) {
        Storage.set('rounds', rounds);
      };

      /**
       * @ngdoc method
       * @name Match#reset
       * @kind function
       * @methodOf app.service:Match
       * @description
       * Creates a new match clearing the old one.
       */
      function reset() {
        saveRounds([]);
        currentPlayer = null;
      }

      /**
       * @ngdoc method
       * @name Match#getInitialPoints
       * @kind function
       * @methodOf app.service:Match
       * @return {number} The initial points of each players.
       * @description
       * Returns the initial points of each player.
       */
      function getInitialPoints() {
        return RULES.INITIAL_POINTS;
      }

      /**
       * @ngdoc method
       * @name Match#getMinimumNumberOfPlayers
       * @kind function
       * @methodOf app.service:Match
       * @return {number} The minimum number of players to start a match.
       * @description
       * Returns the minimum number of players to start a match.
       */
      function getMinimumNumberOfPlayers() {
        return RULES.MINIMUM_PLAYERS_NUMBER;
      }

      /**
       * @ngdoc method
       * @name Match#getRounds
       * @kind function
       * @methodOf app.service:Match
       * @return {Array} A container of rounds.
       * @description
       * Returns the list of rounds.
       */
      function getRounds() {
        return Storage.get('rounds') || [];
      }

      /**
       * @ngdoc method
       * @name Match#isRoundStarted
       * @kind function
       * @methodOf app.service:Match
       * @param {number} round The number of the round
       * @return {boolean} True if at least a player completed own round
       * @description
       * Determines if the rount started since at least one player played.
       */
      function isRoundStarted(round) {
        return !!getRounds()[round - 1];
      }

      /**
       * @ngdoc method
       * @name Match#getCurrentPlayer
       * @kind function
       * @methodOf app.service:Match
       * @return {?Object} The current player
       * @description
       * Returns the current player.
       */
      function getCurrentPlayer() {
        return currentPlayer;
      }

      /**
       * @ngdoc method
       * @name Match#addRound
       * @kind function
       * @methodOf app.service:Match
       * @param {Object} player
       * @param {number} round
       * @param {number} points
       * @description
       * Add a new round of a player.
       */
      function addRound(player, round, points) {
        var rounds = getRounds();
        if (!rounds[round - 1]) {
          rounds[round - 1] = {};
        }
        rounds[round - 1][player.id] = points;
        saveRounds(rounds);
      }

      /**
       * @ngdoc method
       * @name Match#getRoundPointsByPlayer
       * @kind function
       * @methodOf app.service:Match
       * @param {Object} player
       * @param {number} round
       * @return {number|undefined} The points of the round of the player
       * @description
       * Returns the points of the player on the selected round.
       */
      function getRoundPointsByPlayer(player, round) {
        var rounds = getRounds();
        if (!rounds[round - 1] ||
            // 0 (zero) is a defined value
            !angular.isNumber(rounds[round - 1][player.id])) {
          return;
        }
        return rounds[round - 1][player.id];
      }

      /**
       * @ngdoc method
       * @name Match#getMaxPointsByRound
       * @kind function
       * @methodOf app.service:Match
       * @param {number} round
       * @return {number} The max number of points of the round
       * @description
       * Returns the maximum number of points made in the given round
       */
      function getMaxPointsByRound(round) {
        var rounds = getRounds();
        var maxPoints = 0;
        angular.forEach(rounds[round - 1], function(playerRound) {
          if (playerRound > maxPoints) {
            maxPoints = playerRound;
          }
        });
        return maxPoints;
      }

      /**
       * @ngdoc method
       * @name Match#setCurrentPlayer
       * @kind function
       * @methodOf app.service:Match
       * @param {Object} The new current player
       * @description
       * Set the current player.
       */
      function setCurrentPlayer(player) {
        currentPlayer = player;
      }

      /**
       * @ngdoc method
       * @name Match#getNextPlayer
       * @kind function
       * @methodOf app.service:Match
       * @param {number} round The number of the round to play
       * @return {Object} The next player
       * @description
       * Returns the next player.
       */
      function getNextPlayer(round) {
        if (getCurrentPlayer()) {
          // Returns the current player if:
          // - he/she didn't play yet
          // - he/she is the first selected player
          if (!angular.isNumber(getRoundPointsByPlayer(getCurrentPlayer(), round)) &&
              (isRoundStarted(round) ||
              angular.equals(getCurrentPlayer(), SelectedPlayers.getAll()[0]))) {
            return getCurrentPlayer();
          }

          var offset = SelectedPlayers.getItemOffset(getCurrentPlayer());
          if (offset < SelectedPlayers.getAll().length - 1) {
            return SelectedPlayers.getAll()[offset + 1];
          }
        }
        return SelectedPlayers.getAll()[0];
      }

      /**
       * @ngdoc method
       * @name Match#getPointsUntilRound
       * @kind function
       * @methodOf app.service:Match
       * @param {Object} player A player
       * @param {number} roundLimit The last round to take into account in the sum.
       * @return {number} The points until given round.
       * @description
       * Returns the sum of points of the selected player until given round.
       */
      function getPointsUntilRound(player, roundLimit) {
        if (!roundLimit) {
          roundLimit = getRounds().length;
        }
        var points = 0;

        if (!angular.isNumber(getRoundPointsByPlayer(player, roundLimit))) {
          roundLimit--;
        }

        for (var i = 1; i <= roundLimit; i++) {
          points += getRoundPointsByPlayer(player, i);
        }

        return points;
      }

      /**
       * @ngdoc method
       * @name Match#getWinners
       * @kind function
       * @methodOf app.service:Match
       * @return {Array} Returns the players who won the match otherwise an empty array
       * @description
       * Returns an array with the players who won the match otherwise an empty array
       */
      function getWinners() {
        var winners = [];
        angular.forEach(SelectedPlayers.getAll(), function(player) {
          if (RULES.INITIAL_POINTS - getPointsUntilRound(player) === 0) {
            winners.push(player);
          }
        });
        return winners;
      }

      /**
       * @ngdoc method
       * @name Match#isRoundOver
       * @kind function
       * @methodOf app.service:Match
       * @param {string} roundID
       * @return {boolean} true if the last player shot
       * @description
       * Returns true if the last player shot, otherwise false
       */
      function isRoundOver(round) {
        var rounds = getRounds();
        //If the next round has not been created yet, it means that the last one has just finished
        if (typeof rounds[round] === 'undefined') {
          return true;
        }
        return false;
      }

      /**
       * @ngdoc method
       * @name Match#isMatchOver
       * @kind function
       * @methodOf app.service:Match
       * @param {string} roundID
       * @return {boolean} true if the match is over
       * @description
       * Returns true if the match is over also considering the settings
       */
      function isMatchOver(round) {
        var temp = Storage.get('s1');

        if (temp) {
          if (isRoundOver(round) && getWinners().length) {
            return true;
          }
          return false;
        }
        if (getWinners().length) {
          return true;
        }
        return false;
      }

      return {
        addRound: addRound,
        getCurrentPlayer: getCurrentPlayer,
        getInitialPoints: getInitialPoints,
        getMaxPointsByRound: getMaxPointsByRound,
        getMinimumNumberOfPlayers: getMinimumNumberOfPlayers,
        getNextPlayer: getNextPlayer,
        getPointsUntilRound: getPointsUntilRound,
        getWinners: getWinners,
        getRoundPointsByPlayer: getRoundPointsByPlayer,
        getRounds: getRounds,
        isRoundStarted: isRoundStarted,
        isRoundOver: isRoundOver,
        isMatchOver: isMatchOver,
        reset: reset,
        setCurrentPlayer: setCurrentPlayer
      };

    }
  ]);
