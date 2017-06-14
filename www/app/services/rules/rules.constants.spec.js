'use strict';

describe('PlayersList factory', function() {
  var RulesConstants;

  beforeEach(module('app'));

  beforeEach(inject(function(_RULES_) {
    RulesConstants = _RULES_;
  }));

  describe('should provide a "INITIAL_POINTS" property that', function() {

    it('should be a number', function() {
      expect(RulesConstants.INITIAL_POINTS).toBe(201);
    });

  });

  describe('should provide a "MINIMUM_PLAYERS_NUMBER" property that', function() {

    it('should be a number', function() {
      expect(RulesConstants.MINIMUM_PLAYERS_NUMBER).toBe(2);
    });

  });

  describe('should provide a "SHOTS_BY_ROUND" property that', function() {

    it('should be a number', function() {
      expect(RulesConstants.SHOTS_BY_ROUND).toBe(3);
    });

  });

});
