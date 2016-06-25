'use strict';


describe('playerCtrl', function() {

	beforeEach(module('dartsApp'));

	//Uso $controller per creare un istanza di playerCtrl.
	it('should create a object array "players" with 0 players', inject(function($controller) {
		var scope = {};
		var ctrl = $controller('playerCtrl', {$scope: scope});

		expect(scope.players.length).toBe(0);
	}));




});
