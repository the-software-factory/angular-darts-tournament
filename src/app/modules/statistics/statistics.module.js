'use strict';

angular
  .module('app.statistics', [
    'ngRoute',
    'ngStorage'
  ])

  .config([
    '$routeProvider',
    function($routeProvider) {
      $routeProvider.when('/statistics', {
        templateUrl: 'app/modules/statistics/statistics.view.html',
        controller: 'StatisticsController',
        controllerAs: 'vm'
      });
    }
  ]);
