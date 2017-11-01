'use strict';

appControllers.controller('AuthController', ['$scope', 'AuthService', function($scope, localStorageService, authService) {
  const self = this;
  self.username = '';
  self.password = '';
  self.user = '';
  self.failed = false;

  self.login = function() {
    authService.login(self.user, function(error, data) {
      if(error) {
        self.failed = true;
      } else {
        self.failed = false;
      }
    });
  }

  self.isAuthenticated = function() {
    console.log(localStorageService);
    if(localStorageService.user && localStorageService.token) {
      return true;
    } else {
      return false;
    }
  };

  self.getUser = function() {
    if (localStorageService.get('user') && localStorageService.get('token')) {
      return localStorageService.get('user');
    }
  };
}]);