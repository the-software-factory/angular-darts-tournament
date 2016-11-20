'use strict';

angular
  .module('app')
  /**
   * @ngdoc service
   * @name app.service:Storage
   * @kind function
   * @description
   * Provides a storage layer to set/get data.
   */
  .factory('Storage', [
    '$localStorage',
    function($localStorage) {

      /**
       * @ngdoc method
       * @name Storage#get
       * @kind function
       * @methodOf app.service:Storage
       * @param {?string} key The key used to identity what needs to be returned.
       * @description
       * Returns the "stuff" associated with the given key, otherwise null.
       */
      function get(key) {
        if ($localStorage.hasOwnProperty(key)) {
          return $localStorage[key];
        }
        return null;
      }

      /**
       * @ngdoc method
       * @name Storage#set
       * @kind function
       * @methodOf app.service:Storage
       * @param {string} key The key used to identity what needs to be returned.
       * @param {*} value The value associated to the given key.
       * @description
       * Save the give value using the "key" as id.
       */
      function set(key, value) {
        $localStorage[key] = value;
      }

      return {
        get: get,
        set: set
      };

    }
  ]);
