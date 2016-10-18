'use strict';

describe('Point factory', function() {
  var PointFactoryService;

  beforeEach(module('app'));

  beforeEach(inject(function(_PointFactory_) {
    PointFactoryService = _PointFactory_;
  }));

  describe('should provide a "create" property that', function() {

    it('should be a function', function() {
      expect(angular.isFunction(PointFactoryService.create)).toBe(true);
    });

    it('should return an object', function() {
      expect(PointFactoryService.create(0)).toEqual({number: 0, allowedRepetitions: 0});
      expect(PointFactoryService.create(1)).toEqual({number: 1, allowedRepetitions: 3});
      expect(PointFactoryService.create(25)).toEqual({number: 25, allowedRepetitions: 2});
    });

  });

});
