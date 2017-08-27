'use strict';

describe('Match factory', function() {
  var MatchService;

  beforeEach(module('app'));

  beforeEach(inject(function(_Match_) {
    MatchService = _Match_;
  }));

  describe('should provide a "reset" property that', function() {

    it('should be a function', function() {
      expect(angular.isFunction(MatchService.reset)).toBe(true);
    });

  });

});
