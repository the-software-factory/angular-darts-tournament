'use strict';

angular
  .module('app')
  // TODO Add docblock
  .factory('PlayersAdapter', [
    'Storage',
    function(Storage) {

      // TODO Add docblock
      var savedPlayersKey = 'savedPlayers';

      // TODO Add docblock
      var selectedPlayersKey = 'selectedPlayers';

      // TODO Add docblock
      function getSavedPlayers() {
        return Storage.get(savedPlayersKey) || [];
      }

      // TODO Add docblock
      function persistSavedPlayers(players) {
        Storage.save(savedPlayersKey, players);
      }

      // TODO Add docblock
      function getSelectedPlayers() {
        return Storage.get(selectedPlayersKey) || [];
      }

      // TODO Add docblock
      function persistSelectedPlayers(players) {
        Storage.save(selectedPlayersKey, players);
      }

      return {
        getSavedPlayers: getSavedPlayers,
        getSelectedPlayers: getSelectedPlayers,
        persistSavedPlayers: persistSavedPlayers,
        persistSelectedPlayers: persistSelectedPlayers
      };

  }]);
