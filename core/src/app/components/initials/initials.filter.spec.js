'use strict';

describe('Initials filter', function() {
  var $filter;

  beforeEach(module('app'));

  beforeEach(inject(function(_$filter_) {
    $filter = _$filter_;
  }));

  it('should return all initial characters of a phrase', function() {
    expect($filter('initials')('this is a very long string')).toBe('tiavls');
  });

});
