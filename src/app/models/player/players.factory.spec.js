'use strict';

describe('Players factory', function() {
  var PlayersFactoryService;

  beforeEach(module('app'));

  beforeEach(inject(function(_PlayersFactory_) {
    PlayersFactoryService = _PlayersFactory_;
  }));

  describe('should provide a "create" property that', function() {

    it('should be a function', function() {
      expect(angular.isFunction(PlayersFactoryService.create)).toBe(true);
    });

    it('should return an object', function() {
      expect(PlayersFactoryService.create('test', [])).toEqual({name: 'test', id: 1, playedGames: 0, wins: 0, bestRoundScore: 0, bestRoundDate: null, shutouts: 0});
    });

    it('should return a new player with the max ID', function() {
      expect(PlayersFactoryService.create('test', [{id: 1}, {id: 5}, {id: 3}])).toEqual({name: 'test', id: 6, playedGames: 0, wins: 0, bestRoundScore: 0, bestRoundDate: null, shutouts: 0});
    });

  });

});
