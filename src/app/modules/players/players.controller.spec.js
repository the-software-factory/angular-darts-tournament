'use strict';

describe('Players controller', function() {
  var createCtrl;

  beforeEach(module('app.players'));

  beforeEach(inject(function($controller) {
    createCtrl = function() {
      return $controller('PlayersController', {
        '$scope': {},
        '$location': {},
        'SavedPlayers': {},
        'SelectedPlayers': {},
        'Match': {}
      });
    };
  }));

  describe('should provide a "startMatch" property that', function() {

    it('should be a function', function() {
      var ctrl = createCtrl();
      expect(angular.isFunction(ctrl.startMatch)).toBe(true);
    });

  });

// TODO This test needs to be completed

});
