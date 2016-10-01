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
       * @ngdoc method
       * @private
       * @name Match#currentPlayer
       * @private
       * @type {Object}
       * @propertyOf app.service:Match
       */
      var currentPlayer = null;

      /**
       * @ngdoc method
       * @name Match#reset
       * @kind function
       * @methodOf app.service:Match
       * @description
       * Creates a new match clearing the old one.
       */
      function reset() {
        Storage.save('rounds', []);
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
          if (offset < 0) {
            return SelectedPlayers.get()[offset - 1];
          }
        }
        return SelectedPlayers.get()[SelectedPlayers.get().length - 1];
      }

      return {
        getCurrentPlayer: getCurrentPlayer,
        getInitialPoints: getInitialPoints,
        getNextPlayer: getNextPlayer,
        getRounds: getRounds,
        reset: reset,
        setCurrentPlayer: setCurrentPlayer
      };

    }
  ]);
