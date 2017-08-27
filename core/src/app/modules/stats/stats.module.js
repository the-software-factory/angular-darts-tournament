'use strict';

angular
  .module('app.stats', [
    'ngRoute',
    'ngStorage'
  ])

  .config([
    '$routeProvider',
    function($routeProvider) {
      $routeProvider.when('/stats', {
        templateUrl: 'app/modules/stats/stats.view.html',
        controller: 'StatsController',
        controllerAs: 'vm'
      });
    }
  ]);
