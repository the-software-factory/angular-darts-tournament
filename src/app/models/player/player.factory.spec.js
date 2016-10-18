'use strict';

describe('Players factory', function() {
  var PlayerFactoryService;

  beforeEach(module('app'));

  beforeEach(inject(function(_PlayerFactory_) {
    PlayerFactoryService = _PlayerFactory_;
  }));

  describe('should provide a "create" property that', function() {

    it('should be a function', function() {
      expect(angular.isFunction(PlayerFactoryService.create)).toBe(true);
    });

    it('should return an object', function() {
      expect(PlayerFactoryService.create('test', [])).toEqual({name: 'test', id: 1});
    });

    it('should return a new player with the max ID', function() {
      expect(PlayerFactoryService.create('test', [{id: 1}, {id: 5}, {id: 3}])).toEqual({name: 'test', id: 6});
    });

  });

});
