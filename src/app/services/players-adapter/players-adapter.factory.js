'use strict';

angular
  .module('app')
  /**
   * @ngdoc service
   * @name app.service:PlayersAdapter
   * @kind function
   * @description
   * Provides functions to save/delete/update players.
   */
  .factory('PlayersAdapter', [
    'Storage',
    function(Storage) {

      /**
       * @ngdoc method
       * @private
       * @name PlayersAdapter#savedPlayersKey
       * @type {string}
       * @propertyOf app.service:PlayersAdapter
       */
      var savedPlayersKey = 'savedPlayers';

      /**
       * @ngdoc method
       * @private
       * @name PlayersAdapter#selectedPlayersKey
       * @type {string}
       * @propertyOf app.service:PlayersAdapter
       */
      var selectedPlayersKey = 'selectedPlayers';

      /**
       * @ngdoc method
       * @name PlayersAdapter#getSavedPlayers
       * @kind function
       * @methodOf app.service:PlayersAdapter
       * @return {Array} A container of saved players.
       * @description
       * Return all saved players.
       */
      function getSavedPlayers() {
        return Storage.get(savedPlayersKey) || [];
      }

      /**
       * @ngdoc method
       * @name PlayersAdapter#persistSavedPlayers
       * @kind function
       * @methodOf app.service:PlayersAdapter
       * @param {Array} players A container of players to save.
       * @description
       * Replace all saved players with the new ones.
       */
      function persistSavedPlayers(players) {
        Storage.save(savedPlayersKey, players);
      }

      /**
       * @ngdoc method
       * @name PlayersAdapter#getSelectedPlayers
       * @kind function
       * @methodOf app.service:PlayersAdapter
       * @return {Array} A container of saved players.
       * @description
       * Return all selected players.
       */
      function getSelectedPlayers() {
        return Storage.get(selectedPlayersKey) || [];
      }

      /**
       * @ngdoc method
       * @name PlayersAdapter#persistSelectedPlayers
       * @kind function
       * @methodOf app.service:PlayersAdapter
       * @param {Array} players A container of players that have been selected.
       * @description
       * Replace all selected players with the new ones.
       */
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
