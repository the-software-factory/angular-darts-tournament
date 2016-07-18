'use strict';

describe('Unit: players', function() {

	var ctrl;
	// Include Modules
	beforeEach(angular.mock.module('app'));
	beforeEach(module('app.player'));
	beforeEach(module('ngRoute'));

	it('Should have 0 players', inject(function($controller) {
		ctrl = $controller('playerCtrl', {}, {});
		expect(ctrl.players.length).toBe(0);
	}));

	it('Should have a storagePlayers array', inject(function($controller) {
		ctrl = $controller('playerCtrl', {}, {});
		expect(ctrl.storagePlayers).toBeDefined();
	}));

});
