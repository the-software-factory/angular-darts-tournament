'use strict';

angular
  .module('app')
  /**
   * @ngdoc filter
   * @name app.filter:initials
   * @kind function
   * @param {string} string A string to filter
   * @return {string} The initials of the given string
   * @description
   * Returns a string composed by all first letter of each word.
   */
  .filter('initials', [
    function() {
      return function(string) {
        var initials = [];
        var words = string.split(' ');
        angular.forEach(words, function(word) {
          initials.push(word.charAt(0));
        });
        return initials.join('');
      };
    }
  ]);
