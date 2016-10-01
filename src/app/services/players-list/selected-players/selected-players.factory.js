'use strict';

angular
  .module('app')
  /**
   * @ngdoc service
   * @name app.service:SelectedPlayers
   * @kind function
   * @description
   * Provides functions to handle a selected players list.
   */
  .factory('SelectedPlayers', [
    'PlayersList',
    function(PlayersList) {

      /**
       * @ngdoc method
       * @private
       * @name SelectedPlayers#storageKey
       * @private
       * @type {string}
       * @propertyOf app.service:SelectedPlayers
       */
      var storageKey = 'selectedPlayers';

      /**
       * @ngdoc method
       * @name SelectedPlayers#addItem
       * @kind function
       * @methodOf app.service:SelectedPlayers
       * @param {Object} item Object to add in the storage
       * @description
       * Add given item in the storage.
       */
      function addItem(item) {
        PlayersList.addItem(storageKey, item);
      }

      /**
       * @ngdoc method
       * @name SelectedPlayers#get
       * @kind function
       * @methodOf app.service:SelectedPlayers
       * @return {Array} The entire list of selected players.
       * @description
       * Returns the entire list referenced by give storageKey
       */
      function get() {
        return PlayersList.get(storageKey);
      }

      /**
       * @ngdoc method
       * @name SelectedPlayers#get
       * @kind function
       * @methodOf app.service:isItemAdded
       * @param {Object} item Object to add in the storage
       * @return {boolean} True if the given item has been already added.
       * @description
       * Determines if the given item is stored in the list.
       */
      function isItemAdded(item) {
        return PlayersList.isItemAdded(storageKey, item);
      }

      /**
       * @ngdoc method
       * @name SelectedPlayers#removeItem
       * @kind function
       * @methodOf app.service:SelectedPlayers
       * @param {Object} item Object to remove from the storage
       * @description
       * Remove the give item from the storage.
       */
      function removeItem(item) {
        PlayersList.removeItem(storageKey, item);
      }

      /**
       * @ngdoc method
       * @name SelectedPlayers#save
       * @kind function
       * @methodOf app.service:SelectedPlayers
       * @param {Array} list A container of objects.
       * @description
       * Replace the old list with the new one.
       */
      function save(list) {
        PlayersList.save(storageKey, list);
      }

      return {
        addItem: addItem,
        get: get,
        isItemAdded: isItemAdded,
        removeItem: removeItem,
        save: save
      };

    }
  ]);