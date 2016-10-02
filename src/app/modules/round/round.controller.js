'use strict';

angular
  .module('app.round')
  /**
   * @ngdoc controller
   * @name app.round.controller:RoundController
   * @description
   * The controller for the summary page.
   */
  .controller('RoundController', [
    '$routeParams',
    '$location',
    'SelectedPlayers',
    'Match',
    function($routeParams, $location, SelectedPlayers, Match) {
      var vm = this;

      // Exposes public methods
      vm.addPoint = addPoint;
      vm.cancel = cancel;
      vm.confirm = confirm;
      vm.getMissingPoints = getMissingPoints;
      vm.getRoundSum = getRoundSum;
      vm.go = go;
      vm.init = init;
      vm.isButtonDisabled = isButtonDisabled;
      vm.isRoundCompleted = isRoundCompleted;

      /**
       * @ngdoc property
       * @name RoundController#numbers
       * @type {Array}
       * @propertyOf app.round.controller:RoundController
       * @description The collection of allowed numbers on the circular dartboard.
       */
      vm.numbers = [];

      /**
       * @ngdoc property
       * @name RoundController#player
       * @type {Object}
       * @propertyOf app.round.controller:RoundController
       * @description The current player.
       */
      vm.player = SelectedPlayers.getById($routeParams.playerID);

      /**
       * @ngdoc property
       * @name RoundController#shotIndex
       * @type {number}
       * @propertyOf app.round.controller:RoundController
       */
      vm.shotIndex = 0;

      /**
       * @ngdoc property
       * @name RoundController#round
       * @type {number}
       * @propertyOf app.round.controller:RoundController
       */
      vm.round = $routeParams.roundID;

      /**
       * @ngdoc property
       * @name RoundController#shots
       * @type {Array}
       * @propertyOf app.round.controller:RoundController
       */
      vm.shots = [];

      /**
       * @ngdoc property
       * @name RoundController#number
       * @type {number}
       * @propertyOf app.round.controller:RoundController
       * @description The last pressed number
       */
      vm.number = null;

      /**
       * @ngdoc property
       * @name RoundController#boolean
       * @type {boolean}
       * @propertyOf app.round.controller:RoundController
       * @description Determines if the last pressed number is disabled or not.
       */
      vm.isNumberDisabled = false;

      vm.init();

      /**
       * @ngdoc method
       * @name RoundController#init
       * @kind function
       * @methodOf app.round.controller:RoundController
       * @description
       * Initialize the properties of the controller.
       */
      function init() {
        for (var i = 0; i <= 20; i++) {
          vm.numbers.push(i);
        }
        vm.numbers.push(25);
        Match.setCurrentPlayer(vm.player);
      }

      /**
       * @ngdoc method
       * @name RoundController#addPoint
       * @kind function
       * @methodOf app.round.controller:RoundController
       * @description
       * Stores the given point and blocks the button if it can no longer be clicked.
       */
      function addPoint(value) {
        vm.number = value;
        value = parseInt(value);

        vm.shots[vm.shotIndex] = vm.shots[vm.shotIndex] ? vm.shots[vm.shotIndex] += value : value;

        switch (value) {
          case 0:
            vm.isNumberDisabled = true;
            break;
          case 25:
            // 25 has a double value that is 50 (the center)
            if (vm.shots[vm.shotIndex] == value * 2) {
              vm.isNumberDisabled = true;
            }
            break;
          default:
            // Any other number has a double (the border of the dartboard) or a triple value
            if (vm.shots[vm.shotIndex] == value * 3) {
              vm.isNumberDisabled = true;
            }
            break;
        }
      }

      // TODO Add docblock
      function cancel() {
        // TODO To implement
        alert('to implement');
      }

      /**
       * @ngdoc method
       * @name RoundController#isRoundCompleted
       * @kind function
       * @methodOf app.round.controller:RoundController
       * @return {boolean} True if the round is completed.
       * @description
       * Determines if the round is completed.
       */
      function isRoundCompleted() {
        return vm.shots.length == 3 && vm.number == null;
      }

      // TODO Add docblock
      function confirm() {
        vm.isNumberDisabled = false;
        vm.number = null;
        Match.addRound(vm.player, vm.round, vm.getRoundSum());
        if (vm.shots.length === 3) {
          return;
        }
        vm.shotIndex++;
        // TODO Enable all buttons
      }

      /**
       * @ngdoc method
       * @name RoundController#getMissingPoints
       * @kind function
       * @methodOf app.round.controller:RoundController
       * @return {number} The missing points to win.
       * @description
       * Determines the missing points taking into account the ones done in the current round.
       */
      function getMissingPoints() {
        var missingPoints = Match.getInitialPoints() - vm.getRoundSum();
        if (vm.round > 1) {
          missingPoints -= Match.getPoints(vm.player, vm.round - 1);
        }
        return missingPoints;
      }

      /**
       * @ngdoc method
       * @name RoundController#getRoundSum
       * @kind function
       * @methodOf app.round.controller:RoundController
       * @return {number} The sum of points of the current round
       * @description
       * Returns the sum of points of the current round.
       */
      function getRoundSum() {
        var sum = 0;
        angular.forEach(vm.shots, function(value) {
          sum += value;
        });
        return sum;
      }

      // TODO Add docblock
      function go() {
        // NOTE: Object.keys returns "$$hashKey"
        var nextRound = Object.keys(Match.getRounds()[vm.round - 1]).length - 1 < SelectedPlayers.get().length ? vm.round : parseInt(vm.round) + 1;
        $location.path('summary/round/' + nextRound + '/player/' + Match.getNextPlayer().id);
      }

      /**
       * @ngdoc method
       * @name RoundController#isButtonDisabled
       * @kind function
       * @methodOf app.round.controller:RoundController
       * @return {boolean} True if the button is disabled.
       * @description
       * Determines if the given button is disabled or not.
       */
      function isButtonDisabled(value) {
        return (value != vm.number && vm.number != null) || // The button has not be pressed
          (vm.isNumberDisabled && value == vm.number) || // The given value is the one of the pressed button and it can
          // no longer be pressed
          vm.isRoundCompleted(); // Round is completed so any button will be disabled
      }

    }
  ]);
