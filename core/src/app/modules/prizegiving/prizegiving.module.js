'use strict';

angular
  .module('app.prizegiving', [
    'ngRoute',
    'ngStorage'
  ])

  .config([
    '$routeProvider',
    function($routeProvider) {
      $routeProvider.when('/prizegiving', {
        templateUrl: 'app/modules/prizegiving/prizegiving.view.html',
        controller: 'PrizegivingController',
        controllerAs: 'vm'
      });
    }
  ]);
