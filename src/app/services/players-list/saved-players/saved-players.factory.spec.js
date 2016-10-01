'use strict';

describe('SavedPlayers factory', function() {
  var SavedPlayersService;

  beforeEach(module('app'));

  beforeEach(inject(function(_SavedPlayers_) {
    SavedPlayersService = _SavedPlayers_;
  }));

  describe('should provide a "addItem" property that', function() {

    it('should be a function', function() {
      expect(angular.isFunction(SavedPlayersService.addItem)).toBe(true);
    });

  });

});
