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
    '$filter',
    'SelectedPlayers',
    'Match',
    'PointFactory',
    'PlayerStats',
    'RULES',
    function($routeParams, $location, $filter, SelectedPlayers, Match, PointFactory, PlayerStats, RULES) {
      var vm = this;

      // Exposes public methods
      vm.addPoint = addPoint;
      vm.undo = undo;
      vm.confirm = confirm;
      vm.getMissingPoints = getMissingPoints;
      vm.getMissingRedemptionPoints = getMissingRedemptionPoints;
      vm.getRoundSum = getRoundSum;
      vm.getShot = getShot;
      vm.init = init;
      vm.isButtonDisabled = isButtonDisabled;
      vm.isButtonTapped = isButtonTapped;
      vm.isCurrentShot = isCurrentShot;
      vm.isOutOfRange = isOutOfRange;
      vm.isRoundCompleted = isRoundCompleted;
      vm.isShotMade = isShotMade;
      vm.isShutoutRisk = isShutoutRisk;
      vm.viewSummary = viewSummary;

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
       * @name RoundController#points
       * @type {Array}
       * @propertyOf app.round.controller:RoundController
       * @description The collection of allowed points on the circular dartboard.
       */
      vm.points = [];

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
      vm.round = parseInt($routeParams.roundID);

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
          vm.points.push(PointFactory.create(i));
        }
        vm.points.push(PointFactory.create(25));
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
       * NOTE: Keep in mind that 0 is a valid shot.
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
       * @param {Object} number An instance of Number
       * @description
       * Stores the given point and blocks the button if it can no longer be clicked.
       */
      function addPoint(point) {
        vm.number = point.number;
        // Update current round shots
        vm.shots[vm.shotIndex] = vm.getShot(vm.shotIndex) ? vm.getShot(vm.shotIndex) + vm.number : vm.number;

        // Disable current button if it cannot be pressed again
        if (vm.getShot(vm.shotIndex) == vm.number * point.allowedRepetitions) {
          vm.isTappedNumberDisabled = true;
        }
      }

      /**
       * @ngdoc method
       * @name RoundController#undo
       * @kind function
       * @methodOf app.round.controller:undo
       * @description
       * Undo the last shot
       */
      function undo() {
        vm.isTappedNumberDisabled = false;
        vm.number = null;

        // If the current shot has not been made, undo the previous one
        if (!isShotMade(vm.shotIndex)) {
          vm.shotIndex --;
        }

        vm.shots.splice(vm.shotIndex, 1);
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
        // To complete the round the last shot needs to be confirmed
        return !vm.isButtonTapped() &&
            // - User made all shots
            // - User went out of range
            // - User won
            (vm.shots.length == RULES.SHOTS_BY_ROUND || vm.isOutOfRange() || vm.getMissingPoints() === 0);
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

        var currentRoundPoints = vm.isOutOfRange() ? 0 : vm.getRoundSum();
        Match.addRound(vm.player, vm.round, currentRoundPoints);

        if (vm.shots.length < RULES.SHOTS_BY_ROUND) {
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
          missingPoints -= Match.getPointsUntilRound(vm.player, vm.round - 1);
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
        return $filter('arraySum')(vm.shots);
      }

      /**
       * @ngdoc method
       * @name RoundController#viewSummary
       * @kind function
       * @methodOf app.round.controller:RoundController
       * @description
       * Go to the summary view with the info of the next player.
       */
      function viewSummary() {
        // You have to determine if all players played the current round or not.
        var currentRoundPlayedID = $filter('objectKeys')(Match.getRounds()[vm.round - 1]);
        // Updates the best round score of the player if the player makes an higher one
        var playerScore = Match.getRoundPointsByPlayer(vm.player, vm.round);
        if (playerScore > vm.player.bestRoundScore) {
          PlayerStats.updateBestRound(vm.player, playerScore);
        }
        var nextRound = currentRoundPlayedID.length < SelectedPlayers.getAll().length ? vm.round : vm.round + 1;
        $location.path('summary/round/' + nextRound + '/player/' + Match.getNextPlayer(nextRound).id);
      }

      /**
       * @ngdoc method
       * @name RoundController#isButtonDisabled
       * @kind function
       * @methodOf app.round.controller:RoundController
       * @param {Object} point An instance of point model.
       * @return {boolean} True if the button is disabled.
       * @description
       * Determines if the given button is disabled or not.
       */
      function isButtonDisabled(point) {
        // The button has not be pressed
        return (vm.isButtonTapped() && point.number != vm.number) ||
          // The given value is the one of the pressed button and it can no longer be pressed
          (vm.isTappedNumberDisabled && point.number == vm.number) ||
          // Round is completed so any button will be disabled
          vm.isRoundCompleted();
      }

      /**
       * @ngdoc method
       * @name RoundController#isShutoutRisk
       * @kind function
       * @methodOf app.round.controller:RoundController
       * @return {boolean} True if the user risks to lose out a shutout
       * @description
       * Determines if the user risks to lose out a shutout
       */
      function isShutoutRisk() {
        return Match.getMaxPointsByRound(vm.round) >= RULES.SHUTOUT_POINTS;
      }

      /**
       * @ngdoc method
       * @name RoundController#getMissingRedemptionPoints
       * @kind function
       * @methodOf app.round.controller:RoundController
       * @return {number} The redemption points or zero
       * @description
       * Returns the redemption points if the user risks to lose out a shutout otherwise zero (0).
       */
      function getMissingRedemptionPoints() {
        // Player needs one point more.
        var redemptionPoints = Match.getMaxPointsByRound(vm.round) - RULES.SHUTOUT_POINTS + 1 - vm.getRoundSum();
        return redemptionPoints > 0 ? redemptionPoints : 0;
      }

    }
  ]);
