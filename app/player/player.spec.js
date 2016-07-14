'use strict';


describe('playerCtrl', function() {

	// Include Modules
	beforeEach(module('player'));
	beforeEach(module('ngRoute'));
	beforeEach(module('ngStorage'));


	var scope = {};
	

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
