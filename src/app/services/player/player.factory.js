'use strict';

angular
  .module('app')
  // TODO Add docblock
  .factory('PlayerFactory', [
    'Storage',
    function(Storage) {

      // TODO Add docblock
      function create(name) {
        var savedPlayers = Storage.get('savedPlayers') || [];
        var playerID = 1;
        angular.forEach(savedPlayers, function(player) {
          if (player.id >= playerID) {
            playerID = player.id + 1;
          }
        });
        return {
          name: name,
          id: playerID,
          // TODO To remove. This should be a property between player and match
          totScore: 501
        }
      }

      return {
        create: create
      };

    }
  ]);
