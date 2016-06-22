'use strict';

angular.module('dartsHome', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'dartsHome/dartsHome.html',
    controller: 'homeCtrl'
  });
}])

.controller('homeCtrl', [function() {

}]);