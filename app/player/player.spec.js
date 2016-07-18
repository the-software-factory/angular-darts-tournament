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


"use strict";

describe('Players controller', function() {
	var createCtrl;

	beforeEach(module('app.player'));
	beforeEach(inject(function($controller) {
		createCtrl = function() {
			return $controller('playerCtrl', {}, {});
		};
	}));

	it('should have players property initialized to 0', function() {
		var ctrl = createCtrl();
		expect(ctrl.players.length).toBe(0);
	});

	it('should expose storagePlayers array', function() {
		var ctrl = createCtrl();
		expect(angular.isArray(ctrl.storagePlayers)).toBeTruthy();
	});
});
