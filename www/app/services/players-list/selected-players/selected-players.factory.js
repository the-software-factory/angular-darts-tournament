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
      var storageKey = 'players';

      /**
       * @ngdoc method
       * @name PlayersList#getItemOffset
       * @kind function
       * @methodOf app.service:PlayersList
       * @param {Object} item Object to find in the storage
       * @return {number} The item offset
       * @description
       * Returns the offset of the given item in the storage, otherwise -1.
       */
      function getItemOffset(item) {
        return PlayersList.getItemOffset(storageKey, item);
      }

      /**
       * @ngdoc method
       * @name SelectedPlayers#add
       * @kind function
       * @methodOf app.service:SelectedPlayers
       * @param {Object} item Object to add in the storage
       * @description
       * Add given item in the storage.
       */
      function add(item) {
        PlayersList.add(storageKey, item);
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
      function getAll() {
        return PlayersList.getAll(storageKey);
      }

      /**
       * @ngdoc method
       * @name SelectedPlayers#get
       * @kind function
       * @methodOf app.service:isAdded
       * @param {Object} item Object to add in the storage
       * @return {boolean} True if the given item has been already added.
       * @description
       * Determines if the given item is stored in the list.
       */
      function isAdded(item) {
        return PlayersList.isAdded(storageKey, item);
      }

      /**
       * @ngdoc method
       * @name SelectedPlayers#remove
       * @kind function
       * @methodOf app.service:SelectedPlayers
       * @param {Object} item Object to remove from the storage
       * @description
       * Remove the give item from the storage.
       */
      function remove(item) {
        PlayersList.remove(storageKey, item);
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

      /**
       * @ngdoc method
       * @name SelectedPlayers#getById
       * @kind function
       * @methodOf app.service:SelectedPlayers
       * @param {number} id Value of the item id
       * @return {number} The item that matches the given id.
       * @description
       * Returns the item whose id matches the give one.
       */
      function getById(id) {
        return PlayersList.getById(storageKey, id);
      }

      return {
        add: add,
        getAll: getAll,
        getById: getById,
        getItemOffset: getItemOffset,
        isAdded: isAdded,
        remove: remove,
        save: save
      };

    }
  ]);