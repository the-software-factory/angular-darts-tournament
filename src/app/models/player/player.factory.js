'use strict';

angular
  .module('app')
  /**
   * @ngdoc service
   * @name app.service:PlayerFactory
   * @kind function
   * @description
   * Generates new players objects.
   */
  .factory('PlayerFactory', [
    function() {

      /**
       * @ngdoc method
       * @name PlayerFactory#create
       * @kind function
       * @methodOf app.service:PlayerFactory
       * @param {string} name The name of the new player
       * @param {Array} players The list of available players
       * @description
       * Creates a new player given his/her name.
       */
      function create(name, players) {
        var playerID = 1;
        // Gets the max playerID between the available players and increments it by 1
        angular.forEach(players, function(player) {
          if (player.id >= playerID) {
            playerID = player.id + 1;
          }
        });

        return {
          name: name,
          id: playerID
        };
      }

      return {
        create: create
      };

    }
  ]);
