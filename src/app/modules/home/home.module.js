'use strict';

angular
  .module('app.home', [
    'ngRoute',
    'ngStorage',
    'pascalprecht.translate'
  ])

  .config([
    '$routeProvider',
    function($routeProvider) {
      $routeProvider.when('/', {
        templateUrl: 'app/modules/home/home.view.html'
      });
    }
  ]);
