'use strict';

angular
  .module('app.settings', [
    'ngRoute',
    'ngStorage'
  ])

  .config([
    '$routeProvider',
    function($routeProvider) {
      $routeProvider.when('/settings', {
        templateUrl: 'app/modules/settings/settings.view.html',
        controller: 'SettingsController',
        controllerAs: 'vm'
      });
    }
  ]);
