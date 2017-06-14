/* unused */
'use strict';

angular
  .module('app.summary', [
    'ngRoute',
    'ngStorage'
  ])

  .config([
    '$routeProvider',
    function($routeProvider) {
      $routeProvider.when('/summary/round/:roundID/player/:playerID', {
        templateUrl: 'app/modules/summary/summary.view.html',
        controller: 'SummaryController',
        controllerAs: 'vm'
      });
    }
  ]);
