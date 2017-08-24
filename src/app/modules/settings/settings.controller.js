'use strict';

angular
  .module('app.settings')
  /**
   * @ngdoc controller
   * @name app.settings.controller:SettingsController
   * @description
   * The controller for the settings.
   */
   .controller('SettingsController', [
     '$location',
     'Storage',
     function($location, Storage) {
       var vm = this;

       //Exposes public methods
       vm.goBack = goBack;
       vm.getStoredSetting = getStoredSetting;
       vm.storeSetting = storeSetting;

       /**
        * @ngdoc property
        * @name SettingsController#setEndMatch
        * @type {boolean}
        * @propertyOf app.settings.controller:SettingsController
        */
       vm.setEndMatch = getStoredSetting();

       /**
        * @ngdoc method
        * @name SettingsController#goBack
        * @kind function
        * @methodOf app.settings.controller:SettingsController
        * @description
        * Stores the settings and go back to the players view
        */
       function goBack() {
         $location.path('players');
       }

       /**
        * @ngdoc method
        * @name SettingsController#getStoredSetting
        * @kind function
        * @methodOf app.settings.controller:SettingsController
        * @description
        * Return the value of the setting
        */
       function getStoredSetting() {
         return Storage.get('settings');
       }

       /**
        * @ngdoc method
        * @name SettingsController#storeSetting
        * @kind function
        * @methodOf app.settings.controller:SettingsController
        * @description
        * Stores the setting
        */
       function storeSetting() {
         Storage.set('settings', vm.setEndMatch);
       }

     }
   ]);
