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
        angular.forEach(get(storageKey), function(iteratedItem, index) {
          if (iteratedItem.id === item.id) {
            offset = index;
          }
        });
        return offset;
      }

      /**
       * @ngdoc method
       * @name PlayersList#addItem
       * @kind function
       * @methodOf app.service:PlayersList
       * @param {string} storageKey Key used by storage to reference item
       * @param {Object} item Object to add in the storage
       * @description
       * Add given item in the storage.
       */
      function addItem(storageKey, item) {
        if (!isItemAdded(storageKey, item)) {
          var storage = get(storageKey);
          storage.push(item);
          save(storageKey, storage);
        }
      }

      /**
       * @ngdoc method
       * @name PlayersList#get
       * @kind function
       * @methodOf app.service:PlayersList
       * @param {string} storageKey Key used by storage to reference item
       * @return {Array} The entire list of players.
       * @description
       * Returns the entire list referenced by give storageKey
       */
      function get(storageKey) {
        return Storage.get(storageKey) || [];
      }

      /**
       * @ngdoc method
       * @name PlayersList#isItemAdded
       * @kind function
       * @methodOf app.service:PlayersList
       * @param {string} storageKey Key used by storage to reference item
       * @param {Object} item Object to add in the storage
       * @return {boolean} True if the given item has been already added.
       * @description
       * Determines if the given item is stored in the list.
       */
      function isItemAdded(storageKey, item) {
        return getItemOffset(storageKey, item) >= 0;
      }

      /**
       * @ngdoc method
       * @name PlayersList#removeItem
       * @kind function
       * @methodOf app.service:PlayersList
       * @param {string} storageKey Key used by storage to reference item
       * @param {Object} item Object to remove from the storage
       * @description
       * Remove the give item from the storage.
       */
      function removeItem(storageKey, item) {
        var storage = get(storageKey);
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
        Storage.save(storageKey, list);
      }

      /**
       * @ngdoc method
       * @name PlayersList#getById
       * @kind function
       * @methodOf app.service:PlayersList
       * @param {string} storageKey Key used by storage to reference item
       * @param {number} id Value of the item id
       * @return {number} The item that matches the given id.
       * @description
       * Returns the item whose id matches the give one.
       */
      function getById(storageKey, id) {
        var item = null;
        angular.forEach(get(storageKey), function(iteratedItem) {
          if (iteratedItem.id == id) {
            item = iteratedItem;
          }
        });
        return item;
      }

      return {
        addItem: addItem,
        get: get,
        getById: getById,
        getItemOffset: getItemOffset,
        isItemAdded: isItemAdded,
        removeItem: removeItem,
        save: save
      };

    }
  ]);
