'use strict';

describe('Players controller', function() {
  var createCtrl;

  beforeEach(module('app.players'));

  beforeEach(inject(function($controller) {
    createCtrl = function() {
      return $controller('PlayersController', {
        'SavedPlayers': {},
        'SelectedPlayers': {},
        'PlayerFactory': {},
        'Match': {}
      });
    };
  }));

  describe('should provide a "addNewPlayer" property that', function() {

    it('should be a function', function() {
      var ctrl = createCtrl();
      expect(angular.isFunction(ctrl.addNewPlayer)).toBe(true);
    });

  });

  // TODO This test needs to be completed

});
