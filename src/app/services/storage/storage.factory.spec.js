'use strict';

describe('Storage factory', function() {
  var StorageService;

  beforeEach(module('app'));

  beforeEach(inject(function(_Storage_) {
    StorageService = _Storage_;
  }));

  describe('should provide a "get" property that', function() {

    it('should be a function', function() {
      expect(angular.isFunction(StorageService.get)).toBe(true);
    });

  });

});
