'use strict';

// Declare app level module which depends on views, and components
angular
  .module('app', [
    'ngRoute',
    'ngStorage',
    'app.home',
    'app.players',
    'app.prizegiving',
    'app.round',
    'app.summary',
    'app.settings',
    'app.stats',
    'pascalprecht.translate'
  ])

  .config([
    '$locationProvider',
    '$routeProvider',
    '$translateProvider',
    function($locationProvider, $routeProvider, $translateProvider) {
      $locationProvider.hashPrefix('!');
      // Redirects user to the main page if the selected one does not exist
      $routeProvider.otherwise({redirectTo: '/'});
      $translateProvider.useStaticFilesLoader({
        prefix: '/app/translations/',
        suffix: '.json'
      });
      $translateProvider.useMessageFormatInterpolation();
      $translateProvider.preferredLanguage('it');
    }
  ]);
