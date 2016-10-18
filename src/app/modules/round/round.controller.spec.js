'use strict';

describe('Summary controller', function() {
  var createCtrl;
  
  beforeEach(module('app.round'));
  
  beforeEach(inject(function($controller) {
    createCtrl = function() {
      return $controller('RoundController', {
        '$routeParams': {},
        '$location': {},
        'SelectedPlayers': {
          'getById': angular.noop
        },
        'Match': {
          'setCurrentPlayer': angular.noop
        },
        'PointFactory': {
          create: angular.noop
        },
        'RULES': {}
      });
    };
  }));
  
  describe('should provide a "addPoint" property that', function() {
    
    it('should be a function', function() {
      var ctrl = createCtrl();
      expect(angular.isFunction(ctrl.addPoint)).toBe(true);
    });
    
  });
  
  // TODO This test needs to be completed
  
});
