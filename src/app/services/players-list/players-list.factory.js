'use strict';

angular
  .module('app')
  /**
   * @ngdoc service
   * @name app.service:PlayersList
   * @kind function
   * @description
   * Provides functions to handle a players list.
   */
  .factory('PlayersList', [
    'Storage',
    function(Storage) {

      /**
       * @ngdoc property
       * @name PlayersList#currentMatchID
       * @private
       * @type {Object}
       * @propertyOf app.service:Match
       */
      var currentMatchID;

      /**
       * @ngdoc method
       * @name PlayersList#getItemOffset
       * @kind function
       * @methodOf app.service:PlayersList
       * @param {string} storageKey Key used by storage to reference item
       * @param {Object} item Object to find in the storage
       * @return {number} The item offset
       * @description
       * Returns the offset of the given item in the storage, otherwise -1.
       */
      function getItemOffset(storageKey, item) {
        var offset = -1;
        angular.forEach(getAll(storageKey), function(iteratedItem, index) {
          if (iteratedItem.id === item.id) {
            offset = index;
          }
        });
        return offset;
      }

      /**
       * @ngdoc method
       * @name PlayersList#add
       * @kind function
       * @methodOf app.service:PlayersList
       * @param {string} storageKey Key used by storage to reference item
       * @param {Object} item Object to add in the storage
       * @description
       * Add given item in the storage.
       */
      function add(storageKey, item) {
        if (!isAdded(storageKey, item)) {
          var storage = getAll(storageKey);
          storage.push(item);
          save(storageKey, storage);
        }
      }

      /**
       * @ngdoc method
       * @name PlayersList#getAll
       * @kind function
       * @methodOf app.service:PlayersList
       * @param {string} storageKey Key used by storage to reference item
       * @return {Array} The entire list of players.
       * @description
       * Returns the entire list referenced by give storageKey
       */
      function getAll(storageKey) {
        return Storage.get(storageKey) || [];
      }

      /**
       * @ngdoc method
       * @name PlayersList#isAdded
       * @kind function
       * @methodOf app.service:PlayersList
       * @param {string} storageKey Key used by storage to reference item
       * @param {Object} item Object to add in the storage
       * @return {boolean} True if the given item has been already added.
       * @description
       * Determines if the given item is stored in the list.
       */
      function isAdded(storageKey, item) {
        return getItemOffset(storageKey, item) >= 0;
      }

      /**
       * @ngdoc method
       * @name PlayersList#remove
       * @kind function
       * @methodOf app.service:PlayersList
       * @param {string} storageKey Key used by storage to reference item
       * @param {Object} item Object to remove from the storage
       * @description
       * Remove the give item from the storage.
       */
      function remove(storageKey, item) {
        var storage = getAll(storageKey);
        storage.splice(getItemOffset(storageKey, item), 1);
        save(storageKey, storage);
      }

      /**
       * @ngdoc method
       * @name PlayersList#save
       * @kind function
       * @methodOf app.service:PlayersList
       * @param {string} storageKey Key used by storage to reference item
       * @param {Array} list A container of objects.
       * @description
       * Replace the old list with the new one.
       */
      function save(storageKey, list) {
        var matchList = Storage.get('matchList');
        if (matchList == undefined) {
          matchList = [];
        }
        matchList.push(currentMatchID);
        Storage.set('matchList', matchList);
        Storage.set(storageKey, list);
      }

      /**
       * @ngdoc method
       * @name PlayersList#getByID
       * @kind function
       * @methodOf app.service:PlayersList
       * @param {string} storageKey Key used by storage to reference item
       * @param {number} id Value of the item id
       * @return {number} The item that matches the given id.
       * @description
       * Returns the item whose id matches the give one.
       */
      function getByID(storageKey, id) {
        var item = null;
        angular.forEach(getAll(storageKey), function(iteratedItem) {
          if (iteratedItem.id == id) {
            item = iteratedItem;
          }
        });
        return item;
      }

      /**
       * @ngdoc method
       * @name PlayersList#updateMatchID
       * @kind function
       * @methodOf app.service:PlayersList
       * @description
       * Update the matchID with a fresh one.
       */
      function updateMatchID() {
        currentMatchID = new Date;
      }

      return {
        add: add,
        getAll: getAll,
        getByID: getByID,
        getItemOffset: getItemOffset,
        isAdded: isAdded,
        remove: remove,
        save: save,
        updateMatchID: updateMatchID,
        currentMatchID: currentMatchID
      };

    }
  ]);
