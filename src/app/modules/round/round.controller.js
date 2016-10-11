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
      vm.getShot = getShot;
      vm.goToSummary = goToSummary;
      vm.init = init;
      vm.isButtonDisabled = isButtonDisabled;
      vm.isButtonTapped = isButtonTapped;
      vm.isCurrentShot = isCurrentShot;
      vm.isOutOfRange = isOutOfRange;
      vm.isRoundCompleted = isRoundCompleted;
      vm.isShotMade = isShotMade;

      /**
       * @ngdoc property
       * @name RoundController#boolean
       * @type {boolean}
       * @propertyOf app.round.controller:RoundController
       * @description Determines if the last pressed number is disabled or not.
       */
      vm.isTappedNumberDisabled = false;

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
       * @name RoundController#round
       * @type {number}
       * @propertyOf app.round.controller:RoundController
       */
      vm.round = $routeParams.roundID;

      /**
       * @ngdoc property
       * @name RoundController#shotIndex
       * @type {number}
       * @propertyOf app.round.controller:RoundController
       */
      vm.shotIndex = 0;

      /**
       * @ngdoc property
       * @name RoundController#shots
       * @type {Array}
       * @propertyOf app.round.controller:RoundController
       */
      vm.shots = [];

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
       * @name RoundController#isButtonTapped
       * @kind function
       * @methodOf app.round.controller:RoundController
       * @return {boolean} True if the button is tapped and not confirmed yet.
       * @description
       * Determines if the button has been tapped but not confirmed yet. When confirmed the button won't be marked as
       * tapped.
       */
      function isButtonTapped() {
        return angular.isNumber(vm.number);
      }

      /**
       * @ngdoc method
       * @name RoundController#isShotMade
       * @kind function
       * @methodOf app.round.controller:RoundController
       * @param {number} index The index of the shot
       * @return {boolean} True if the nth shot has been made.
       * @description
       * Determines if the nth shot has been made or not.
       */
      function isShotMade(index) {
        return angular.isNumber(vm.getShot(index));
      }

      /**
       * @ngdoc method
       * @name RoundController#isShotMade
       * @kind function
       * @methodOf app.round.controller:RoundController
       * @param {number} index The index of the shot
       * @return {number|undefined} The nth shot.
       * @description
       * Returns the nth shot
       */
      function getShot(index) {
        return vm.shots[index];
      }

      /**
       * @ngdoc method
       * @name RoundController#isOutOfRange
       * @kind function
       * @methodOf app.round.controller:RoundController
       * @return {boolean} True if the player goes out of range with the last round.
       * @description
       * Determines if the player goes out of range with the last round. It means that player makes more points than the
       * ones that were needed.
       */
      function isOutOfRange() {
        return vm.getMissingPoints() < 0;
      }

      /**
       * @ngdoc method
       * @name RoundController#isCurrentShot
       * @kind function
       * @methodOf app.round.controller:RoundController
       * @param {number} index The index of the shot
       * @return {boolean} True if the player is playing the given nth shot.
       * @description
       * Determines if the player is playing the nth shot or not.
       */
      function isCurrentShot(index) {
        return vm.shotIndex == index;
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
        vm.number = parseInt(value);
        // Update current round shots
        vm.shots[vm.shotIndex] = vm.getShot(vm.shotIndex) ? vm.getShot(vm.shotIndex) + vm.number : vm.number;

        switch (vm.number) {
          case 0:
            vm.isTappedNumberDisabled = true;
            break;
          case 25:
            // 25 has a double value that is 50 (the center)
            if (vm.getShot(vm.shotIndex) == vm.number * 2) {
              vm.isTappedNumberDisabled = true;
            }
            break;
          default:
            // Any other number has a double (the border of the dartboard) or a triple value
            if (vm.getShot(vm.shotIndex) == vm.number * 3) {
              vm.isTappedNumberDisabled = true;
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
        return (vm.shots.length == 3 || vm.isOutOfRange()) && vm.number == null;
      }

      /**
       * @ngdoc method
       * @name RoundController#confirm
       * @kind function
       * @methodOf app.round.controller:confirm
       * @description
       * Confirms the last shot.
       */
      function confirm() {
        vm.isTappedNumberDisabled = false;
        vm.number = null;

        Match.addRound(vm.player, vm.round, vm.isOutOfRange() ? 0 : vm.getRoundSum());

        if (vm.shots.length < 3) {
          vm.shotIndex++;
        }
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

      /**
       * @ngdoc method
       * @name RoundController#goToSummary
       * @kind function
       * @methodOf app.round.controller:RoundController
       * @description
       * Go to the summary view with the info of the next player.
       */
      function goToSummary() {
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
        // The button has not be pressed
        return (vm.isButtonTapped() && value != vm.number) ||
          // The given value is the one of the pressed button and it can no longer be pressed
          (vm.isTappedNumberDisabled && value == vm.number) ||
          // Round is completed so any button will be disabled
          vm.isRoundCompleted();
      }

    }
  ]);
