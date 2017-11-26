'use strict';

appControllers.controller('AuthController', ['$scope', '$location', '$timeout', 'AuthService', function($scope, $location, $timeout, authService) {
  let self = this;
  self.data = {};
  self.data.login = {};
  self.data.register = {};

  self.login = function() {
    let user = self.data.login.user;
    self.login.messages = {};
    authService.login(user, function(error, data, message) {
      if(error) self.login.messages.error = error;
      if(!data) self.login.messages.warning = message;
      if(data) self.login.messages.success = message;
      self.data.login.user = {};

      $timeout(function() {
        self.login.messages = {};
      }, 3000);
    });
  };

  self.register = function() {
    let account = self.data.register.account;
    self.register.messages = {};
    authService.register(account, function(error, data, message) {
      if(error) self.register.messages.error = error;
      if(!data) self.register.messages.warning = message;
      if(data) {
        self.register.messages.success = message;
        $location.path('/shop');
      }
      self.data.register.account = {};

      $timeout(function() {
        self.login.messages = {};
      }, 3000);
    });
  };

  self.logout = function() {
    self.logout.messages = {};
    authService.logout(function(error, data, message) {
      if(error) self.logout.messages.error = error;
      if(!data) self.logout.messages.warning = message;
      if(data) {
        self.logout.messages.success = message;
        $location.path('/home');
      }

      $timeout(function() {
        self.logout.messages = {};
      }, 3000);
    });
  };

  self.isAuthenticated = authService.isAuthenticated;

  self.getUser = authService.getUser;

}]);