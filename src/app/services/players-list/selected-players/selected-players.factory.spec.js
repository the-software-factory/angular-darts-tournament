'use strict';

describe('SelectedPlayers factory', function() {
  var SelectedPlayersService;

  beforeEach(module('app'));

  beforeEach(inject(function(_SelectedPlayers_) {
    SelectedPlayersService = _SelectedPlayers_;
  }));

  describe('should provide a "addItem" property that', function() {

    it('should be a function', function() {
      expect(angular.isFunction(SelectedPlayersService.addItem)).toBe(true);
    });

  });

});
