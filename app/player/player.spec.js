'use strict';

describe('playerCtrl', function() {

	// Include Modules
	beforeEach(module('app'));
	beforeEach(module('player'));
	beforeEach(module('ngRoute'));

	scope = {};

	describe('controller: playerCtrl', function() {
		var testController;

		beforeEach(inject(function($controller) {
			testController = $controller('playerCtrl', {});
		}));

		it('should have model defined', function() {
	   	expect(testController).toBeDefined();
	   	expect(testController.model).toBeDefined();
});
	});
	
	//Uso $controller per creare un istanza di playerCtrl.
	it('should create a object array "players" with 0 players', inject(function($controller) {
		var ctrl = $controller('playerCtrl', {$scope: scope});
		expect(scope.players.length).toBe(0);
	}));

	it('should create a object array "storagePlayers" with 0 players', inject(function($controller) {
		var ctrl = $controller('playerCtrl', {$scope: scope});
		expect(scope.storagePlayers.length).toBe(0);
	}));

});
