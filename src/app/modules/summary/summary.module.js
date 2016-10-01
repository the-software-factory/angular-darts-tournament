'use strict';

angular
  .module('app.summary', [
    'ngRoute',
    'ngStorage'
  ])

  .config([
    '$routeProvider',
    function($routeProvider) {
      $routeProvider.when('/summary', {
        templateUrl: 'app/modules/summary/summary.view.html',
        controller: 'SummaryController',
        controllerAs: 'vm'
      });
    }
  ]);
