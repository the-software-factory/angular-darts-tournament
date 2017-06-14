'use strict';

describe('PlayersSelection controller', function() {
  var createCtrl;

  beforeEach(module('app'));

  beforeEach(inject(function($controller) {
    createCtrl = function() {
      return $controller('PlayersSelectionController', {
        'SavedPlayers': {},
        'SelectedPlayers': {},
        'PlayersFactory': {},
      });
    };
  }));

  describe('should provide a "addNewPlayer" property that', function() {

    it('should be a function', function() {
      var ctrl = createCtrl();
      expect(angular.isFunction(ctrl.addNewPlayer)).toBe(true);
    });

  });

});
