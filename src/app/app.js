'use strict';

// Declare app level module which depends on views, and components
angular
  .module('app', [
    'ngRoute',
    'ngStorage',
    'pascalprecht.translate',
    'app.home',
    'app.players',
    'app.round',
    'app.summary'
  ])

  .config([
    '$translateProvider',
    function($translateProvider) {
      $translateProvider.useStaticFilesLoader({
        prefix: 'app/translations/',
        suffix: '.json'
      });

      $translateProvider.preferredLanguage('it');
    }
  ])

  .config([
    '$locationProvider',
    '$routeProvider',
    function($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');
      // Redirects user to the main page if the selected one does not exist
      $routeProvider.otherwise({redirectTo: '/'});
    }
  ]);
