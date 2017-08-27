'use strict';

describe('ArraySum filter', function() {
  var $filter;

  beforeEach(module('app'));

  beforeEach(inject(function(_$filter_) {
    $filter = _$filter_;
  }));

  it('should return a sum of numbers that', function() {
    expect($filter('arraySum')([1, 2, 3])).toBe(6);
  });

});
