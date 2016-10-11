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
    function(SelectedPlayers, Storage) {
  
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
        Storage.save('rounds', rounds);
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
        return 201;
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
       * @name Match#getRound
       * @kind function
       * @methodOf app.service:Match
       * @param {Object} player
       * @param {number} round
       * @return {number|undefined} The points of the round of the player
       * @description
       * Returns the points of the player on the selected round.
       */
      function getRound(player, round) {
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
       * @return {Object} The next player
       * @description
       * Returns the next player.
       */
      function getNextPlayer() {
        if (getCurrentPlayer()) {
          var offset = SelectedPlayers.getItemOffset(getCurrentPlayer());
          if (offset < SelectedPlayers.get().length - 1) {
            return SelectedPlayers.get()[offset + 1];
          }
        }
        return SelectedPlayers.get()[0];
      }
  
      /**
       * @ngdoc method
       * @name Match#getPoints
       * @kind function
       * @methodOf app.service:Match
       * @param {Object} player A player
       * @param {number} roundLimit The last round to take into account in the sum.
       * @return {number} The points until given round.
       * @description
       * Returns the sum of points of the selected player until given round.
       */
      function getPoints(player, roundLimit) {
        if (!roundLimit) {
          roundLimit = getRounds().length;
        }
        var points = 0;

        if (!getRound(player, roundLimit)) {
          roundLimit--;
        }
  
        for (var i = 1; i <= roundLimit; i++) {
          points += getRound(player, i);
        }

        return points;
      }

      return {
        addRound: addRound,
        getCurrentPlayer: getCurrentPlayer,
        getInitialPoints: getInitialPoints,
        getNextPlayer: getNextPlayer,
        getPoints: getPoints,
        getRound: getRound,
        getRounds: getRounds,
        reset: reset,
        setCurrentPlayer: setCurrentPlayer
      };

    }
  ]);
