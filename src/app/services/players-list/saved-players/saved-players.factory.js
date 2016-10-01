'use strict';

angular
  .module('app')
  /**
   * @ngdoc service
   * @name app.service:SavedPlayers
   * @kind function
   * @description
   * Provides functions to handle a saved players list.
   */
  .factory('SavedPlayers', [
    'PlayersList',
    function(PlayersList) {

      /**
       * @ngdoc method
       * @private
       * @name SavedPlayers#storageKey
       * @private
       * @type {string}
       * @propertyOf app.service:SavedPlayers
       */
      var storageKey = 'savedPlayers';

      /**
       * @ngdoc method
       * @name SavedPlayers#addItem
       * @kind function
       * @methodOf app.service:SavedPlayers
       * @param {Object} item Object to add in the storage
       * @description
       * Add given item in the storage.
       */
      function addItem(item) {
        PlayersList.addItem(storageKey, item);
      }

      /**
       * @ngdoc method
       * @name SavedPlayers#get
       * @kind function
       * @methodOf app.service:SavedPlayers
       * @return {Array} The entire list of saved players.
       * @description
       * Returns the entire list referenced by give storageKey
       */
      function get() {
        return PlayersList.get(storageKey);
      }

      /**
       * @ngdoc method
       * @name SavedPlayers#get
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
       * @name SavedPlayers#removeItem
       * @kind function
       * @methodOf app.service:SavedPlayers
       * @param {Object} item Object to remove from the storage
       * @description
       * Remove the give item from the storage.
       */
      function removeItem(item) {
        PlayersList.removeItem(storageKey, item);
      }

      /**
       * @ngdoc method
       * @name SavedPlayers#save
       * @kind function
       * @methodOf app.service:SavedPlayers
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