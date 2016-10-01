'use strict';

angular
  .module('app.round', [
    'ngRoute',
    'ngStorage'
  ])

  .config([
    '$routeProvider',
    function($routeProvider) {
      $routeProvider.when('/round/:roundID/player/:playerID', {
        templateUrl: 'app/modules/round/round.view.html',
        controller: 'roundCtrl',
        controllerAs: 'vm'
      });
    }
  ]);
