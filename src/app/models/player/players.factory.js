'use strict';

angular
  .module('app')
  /**
   * @ngdoc service
   * @name app.service:PlayersFactory
   * @kind function
   * @description
   * Generates new players objects.
   */
  .factory('PlayersFactory', [
    function() {

      /**
       * @ngdoc method
       * @name PlayersFactory#create
       * @kind function
       * @methodOf app.service:PlayersFactory
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
          id: playerID,
          playedGames: 0,
          wins: 0,
          bestRoundScore: 0,
          bestRoundDate: null,
          shutouts: 0
        };
      }

      return {
        create: create
      };

    }
  ]);
