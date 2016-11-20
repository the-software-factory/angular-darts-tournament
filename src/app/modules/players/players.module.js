'use strict';

angular
  .module('app.players', [
    'ngRoute',
    'ngStorage',
    'pascalprecht.translate'
  ])

  .config([
    '$routeProvider',
    function($routeProvider) {
      $routeProvider.when('/players', {
        templateUrl: 'app/modules/players/players.view.html',
        controller: 'PlayersController',
        controllerAs: 'vm'
      });
    }
  ]);
