'use strict';

describe('Prizegiving controller', function() {
  var createCtrl;

  beforeEach(module('app.prizegiving'));

  beforeEach(inject(function($controller) {
    createCtrl = function() {
      return $controller('PrizegivingController', {
        '$location': {},
        'Match': {},
        'SelectedPlayers': {},
        'PlayerStats': {}
      });
    };
  }));

  describe('should provide a "newMatch" property that', function() {

    it('should be a function', function() {
      var ctrl = createCtrl();
      expect(angular.isFunction(ctrl.newMatch)).toBe(true);
    });

  });

  // TODO This test needs to be completed

});
