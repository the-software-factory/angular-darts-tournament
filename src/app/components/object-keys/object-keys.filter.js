'use strict';

angular
  .module('app')
  /**
   * @ngdoc filter
   * @name app.filter:arraySum
   * @kind function
   * @param {Array} array An array of numbers
   * @return {number} The sum of numbers within the array.
   * @description
   * Returns the sum of each number of the given array.
   */
  .filter('objectKeys', [
    function() {
      return function(object) {
        var keys = [];
        angular.forEach(object, function(value, key) {
          if (key != "$$hashKey") {
            keys.push(key);
          }
        });
        return keys;
      };
    }
  ]);
