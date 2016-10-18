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
  .filter('arraySum', [
    function() {
      return function(array) {
        var sum = 0;
        angular.forEach(array, function(value) {
          sum += value;
        });
        return sum;
      };
    }
  ]);
