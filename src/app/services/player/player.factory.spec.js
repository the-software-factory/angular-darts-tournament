'use strict';

describe('Players factory', function() {
  var PlayerFactoryService;

  beforeEach(module('app'));

  beforeEach(inject(function(_PlayerFactory_) {
    PlayerFactoryService = _PlayerFactory_;
  }));

  describe('should provide a "create" property that', function() {

    it('should be a function', function() {
      expect(angular.isFunction(PlayerFactoryService.create)).toBe(true);
    });

  });

});
