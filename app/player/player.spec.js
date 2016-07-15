'use strict';

describe('Unit: players', function() {

	var ctrl;
	// Include Modules
	beforeEach(angular.mock.module('app'));
	beforeEach(module('app.player'));
	beforeEach(module('ngRoute'));

	it('Should have a players array', inject(function($controller) {
		ctrl = $controller('playerCtrl', {}, {});
		expect(ctrl.players).toBeDefined();
	}));

	it('Should have 0 players', inject(function($controller) {
		ctrl = $controller('playerCtrl', {}, {});
		expect(ctrl.players.length).toEqual(0);
	}));

	it('Should have a storagePlayers array', inject(function($controller) {
		ctrl = $controller('playerCtrl', {}, {});
		expect(ctrl.storagePlayers).toBeDefined();
	}));

});
