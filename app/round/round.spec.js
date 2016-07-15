'use strict';

describe('Unit: round', function() {

  var ctrl;
  // Include Modules
  beforeEach(angular.mock.module('app'));
  beforeEach(module('app.player'));
  beforeEach(module('app.round'));
  beforeEach(module('ngRoute'));

  it('Should have round to equal one', inject(function($controller) {
    ctrl = $controller('roundCtrl', {}, {});
    expect(ctrl.rounds).toEqual(1);
  }));

  it('Should have an arrayScore array', inject(function($controller) {
    ctrl = $controller('roundCtrl', {}, {});
    expect(ctrl.arrayScore).toBeDefined();
  }));

  it('Should have a scoreRound to equal zero', inject(function($controller) {
    ctrl = $controller('roundCtrl', {}, {});
    expect(ctrl.scoreRound).toEqual(0);
  }));

});