'use strict';

describe('Storage factory', function() {
  var StorageService;
  var mockLocalStorage;

  beforeEach(function() {
    module(function($provide) {
      $provide.service('$localStorage', []);
    });
    module('app');
  });

  beforeEach(inject(function(_Storage_, $localStorage) {
    StorageService = _Storage_;
    mockLocalStorage = $localStorage;
  }));

  describe('should provide a "get" property that', function() {

    it('should be a function', function() {
      expect(angular.isFunction(StorageService.get)).toBe(true);
    });

    it('should return value of the key if it exists', function() {
      mockLocalStorage.test = 'value';
      expect(StorageService.get('test')).toBe('value');
    });

    it('should return null if the key does not exist', function() {
      expect(StorageService.get('test')).toBe(null);
    });

  });

  describe('should provide a "save" property that', function() {

    it('should add a new value', function() {
      StorageService.save('test', 'value');
      expect(StorageService.get('test')).toBe('value');
    });

  });

});
