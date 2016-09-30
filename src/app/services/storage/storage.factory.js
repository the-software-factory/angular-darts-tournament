'use strict';

angular
  .module('app')
  // TODO Add docblock
  .factory('Storage', [
    '$localStorage',
    function($localStorage) {

      // TODO Add docblock
      function get(key) {
        if ($localStorage.hasOwnProperty(key)) {
          return $localStorage[key];
        }
        return null;
      }

      // TODO Add docblock
      function save(key, value) {
        $localStorage[key] = value;
      }

      return {
        get: get,
        save: save
      };

    }
  ]);
