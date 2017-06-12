'use strict';

angular
  .module('app')
  /**
   * @ngdoc component
   * @name app.playersSelection.component:playersSelection
   * @description
   * Visualizes created players names and icons.
   */
  .component('playersSelection', {
    templateUrl: 'app/components/players-selection/players-selection.template.html',
    controller: 'PlayersSelectionController'
  });
