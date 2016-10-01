'use strict';

describe('Shots factory', function() {
  var ShotsFactoryService;

  beforeEach(module('app'));

  beforeEach(inject(function(_ShotsFactory_) {
    ShotsFactoryService = _ShotsFactory_;
  }));

  describe('should provide a "create" property that', function() {

    it('should be a function', function() {
      expect(angular.isFunction(ShotsFactoryService.create)).toBe(true);
    });

  });

});
