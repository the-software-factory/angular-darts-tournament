'use strict';

angular
  .module('app')
  /**
   * @ngdoc service
   * @name app.service:PointFactory
   * @kind function
   * @description
   * Generates new number objects.
   */
  .factory('PointFactory', [
    function() {

      /**
       * @ngdoc method
       * @name PointFactory#create
       * @kind function
       * @methodOf app.service:PointFactory
       * @param {number} number The number of the point
       * @description
       * Creates a new point given its number.
       */
      function create(number) {
        // Used to know if the point can be double or triple.
        var allowedRepetitions;

        switch (number) {
          case 0:
            allowedRepetitions = 0;
            break;
          case 25:
            allowedRepetitions = 2;
            break;
          default:
            allowedRepetitions = 3;
        }

        return {
          number: number,
          allowedRepetitions: allowedRepetitions
        };
      }

      return {
        create: create
      };

    }
  ]);
