angular
  .module('app', [
    'ionic',
    'ngStorage',
  ])
  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  })
  /*.config([
    '$locationProvider',
    '$routeProvider',
    function($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');
      // Redirects user to the main page if the selected one does not exist
      $routeProvider.otherwise({redirectTo: '/'});
    }
  ]);*/
  .config(function($stateProvider, $locationProvider, $urlRouterProvider) {
    $stateProvider
      .state('app', {
        url: '/',
        templateUrl: 'app/modules/home/home.view.html'
      })
      .state('players', {
        url: '/players',
        templateUrl: 'app/modules/players/players.view.html',
        controller: 'PlayersController',
        controllerAs: 'vm'
      })
      .state('prizegiving', {
        url: '/prizegiving',
        templateUrl: 'app/modules/prizegiving/prizegiving.view.html',
        controller: 'PrizegivingController',
        controllerAs: 'vm'
      })
      .state('round', {
        url: '/round/:roundID/player/:playerID',
        templateUrl: 'app/modules/round/round.view.html',
        controller: 'RoundController',
        controllerAs: 'vm'
      })
      .state('summary', {
        url: '/summary/round/:roundID/player/:playerID',
        templateUrl: 'app/modules/summary/summary.view.html',
        controller: 'SummaryController',
        controllerAs: 'vm'
      })
    $locationProvider
      .hashPrefix('!');
    $urlRouterProvider.otherwise('/');
  });
