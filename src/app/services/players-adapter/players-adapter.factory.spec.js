'use strict';

describe('PlayersAdapter factory', function() {
  var PlayersAdapterService;

  beforeEach(module('app'));

  beforeEach(inject(function(_PlayersAdapter_) {
    PlayersAdapterService = _PlayersAdapter_;
  }));

  describe('should provide a "getSavedPlayers" property that', function() {

    it('should be a function', function() {
      expect(angular.isFunction(PlayersAdapterService.getSavedPlayers)).toBe(true);
    });

  });

});
