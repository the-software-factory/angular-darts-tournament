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
    'Storage',
    function(Storage) {
  
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

      // TODO add docblock
      function getRounds() {
        return Storage.get('rounds') || [];
      }

      return {
        getInitialPoints: getInitialPoints,
        getRounds: getRounds,
        reset: reset
      };

    }
  ]);
