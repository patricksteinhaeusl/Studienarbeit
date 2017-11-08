'use strict';

appControllers.controller('AuthController', ['$scope', '$location', 'AuthService', 'localStorageService', function($scope, $location, authService, localStorageService) {
  let self = this;
  self.data = {};
  self.data.login = {};
  self.data.register = {} ;
  self.data.login.formSubmitFailed = false;
  self.data.register.formSubmitFailed = false;

  self.login = function() {
    let user = self.data.login.user;
    authService.login(user, function(result) {
      self.data.login = {};
      if(!result)  {
        self.data.login.formSubmitFailed = true;
      } else {
        self.data.login.formSubmitFailed = false;
      }
    });
  };

  self.register = function() {
    let account = self.data.register.account;
    authService.register(account, function(result) {
      self.data.register = {};
      if(!result)  {
        self.data.register.formSubmitFailed = true;
      } else {
        self.data.register.formSubmitFailed = false;
        $location.path('/shop');
      }
    });
  };

  self.logout = function() {
    authService.logout();
  };

  self.isAuthenticated = authService.isAuthenticated;

  self.getUser = authService.getUser;

}]);