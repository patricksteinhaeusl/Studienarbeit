'use strict';

appControllers.controller('AccountController', ['$scope', 'AccountService', 'AuthService',function($scope, accountService, authService) {
  const self = this;
  self.data = {};
  self.data.account = {};

  self.init = function() {
    self.data.account = authService.getUser();
  };

  self.update = function() {
    let account = self.data.account;
    accountService.update(account, function(user, token) {
      self.data.account = user;
    });
  };

  self.init();
}]);