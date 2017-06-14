'use strict';

describe('PlayersList factory', function() {
  var PlayersListService;

  beforeEach(module('app'));

  beforeEach(inject(function(_PlayersList_) {
    PlayersListService = _PlayersList_;
  }));

  describe('should provide a "add" property that', function() {

    it('should be a function', function() {
      expect(angular.isFunction(PlayersListService.add)).toBe(true);
    });

  });

});
