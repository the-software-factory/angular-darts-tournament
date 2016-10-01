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
    'Storage',
    function(Storage) {

      /**
       * @ngdoc method
       * @name PlayerFactory#create
       * @kind function
       * @methodOf app.service:PlayerFactory
       * @param {string} name The name of the new player
       * @description
       * Creates a new player given his/her name.
       */
      function create(name) {
        var savedPlayers = Storage.get('savedPlayers') || [];

        var playerID = 1;
        // Gets the max playerID between the saved players and increments it by 1
        angular.forEach(savedPlayers, function(player) {
          if (player.id >= playerID) {
            playerID = player.id + 1;
          }
        });

        return {
          name: name,
          id: playerID,
          // FIXME To remove. This should be a property that associates player and match.
          totScore: 501
        };
      }

      return {
        create: create
      };

    }
  ]);
