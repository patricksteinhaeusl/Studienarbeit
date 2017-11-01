'use strict';

appControllers.controller('AuthController', ['$scope', 'AuthService', 'localStorageService', function($scope, authService, localStorageService) {
  const self = this;
  self.login = {};
  self.login.formSubmitFailed = false;
  self.register = {};
  self.register.formSubmitFailed = false;

  self.init = function() {
    authService.logout();
  };

  self.login = function() {
    authService.login(self.login.user, function(result) {
      self.login.user = '';
      if(!result)  {
        self.login.formSubmitFailed = true;
      } else {
        self.login.formSubmitFailed = false;
      }
    });
  };

  self.register = function() {
    authService.register(self.register.user, function(result) {
      self.register.user = '';
      if(!result)  {
        self.register.formSubmitFailed = true;
      } else {
        self.register.formSubmitFailed = false;
      }
    });
  };

  self.logout = function() {
    authService.logout(function() {

    });
  };

  self.isAuthenticated = function() {
    if(localStorageService.get('token')) {
      return true;
    } else {
      return false;
    }
  };

  self.getUser = function() {
    if (localStorageService.get('token')) {
      return localStorageService.get('user');
    }
  };
}]);