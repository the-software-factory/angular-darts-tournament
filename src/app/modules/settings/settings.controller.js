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
       vm.getStoredSettings = getStoredSettings;
       vm.storeSettings = storeSettings;

       vm.slackUrl = Storage.get('slackUrl');

       /**
        * @ngdoc property
        * @name SettingsController#setEndMatch
        * @type {boolean}
        * @propertyOf app.settings.controller:SettingsController
        */
       vm.setEndMatch = getStoredSettings();

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
        * @name SettingsController#getStoredSettings
        * @kind function
        * @methodOf app.settings.controller:SettingsController
        * @description
        * Return the value of the setting
        */
       function getStoredSettings() {
         return Storage.get('settings');
       }

       /**
        * @ngdoc method
        * @name SettingsController#storeSettings
        * @kind function
        * @methodOf app.settings.controller:SettingsController
        * @description
        * Stores the setting
        */
       function storeSettings() {
         Storage.set('settings', vm.setEndMatch);
         Storage.set('slackUrl', vm.slackUrl);
       }

     }
   ]);
