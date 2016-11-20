'use strict';

describe('Summary controller', function() {
  var createCtrl;

  beforeEach(module('app.summary'));

  beforeEach(inject(function($controller) {
    createCtrl = function() {
      return $controller('SummaryController', {
        '$location': {},
        '$routeParams': {},
        'SelectedPlayers': {},
        'Match': {},
        'RULES': {}
      });
    };
  }));

  describe('should provide a "getPlayers" property that', function() {

    it('should be a function', function() {
      var ctrl = createCtrl();
      expect(angular.isFunction(ctrl.getPlayers)).toBe(true);
    });

  });

  // TODO This test needs to be completed

});
