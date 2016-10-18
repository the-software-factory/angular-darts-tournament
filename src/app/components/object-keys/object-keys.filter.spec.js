'use strict';

describe('Object keys filter', function() {
  var $filter;

  beforeEach(module('app'));

  beforeEach(inject(function(_$filter_) {
    $filter = _$filter_;
  }));

  describe('should filter object keys that', function() {

    it('should have special keys', function() {
      expect($filter('objectKeys')({id: 2, $$hashKey: 'test'})).toEqual(['id']);
    });

  });

});
