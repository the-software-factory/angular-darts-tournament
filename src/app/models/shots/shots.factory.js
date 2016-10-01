'use strict';

angular
  .module('app')
  /**
   * @ngdoc service
   * @name app.service:ShotsFactory
   * @kind function
   * @description
   * Generates new shots objects.
   */
  .factory('ShotsFactory',
    function() {

      /**
       * @ngdoc method
       * @name ShotsFactory#create
       * @kind function
       * @methodOf app.service:ShotsFactory
       * @param {Object} config The configuration of a shot:
       * - round {number} The number of the round
       * - player {Object} The player that did current shot
       * - number {number} The shoot number (first, second, third)
       * - points {number} The points of the shoot
       * @description
       * Creates a new shot.
       */
      function create(config) {
        return {
          round: config.round,
          number: config.number,
          points: config.points,
          playerID: config.player.id
        };
      }

      return {
        create: create
      };

    }
  );
