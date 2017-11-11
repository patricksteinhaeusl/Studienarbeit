'use strict';

appControllers.controller('CreditCardsController', ['$scope', 'CreditCardsService', 'AuthService',function($scope, creditCardsService, authService) {
  console.log("CreditCardsController");
  const self = this;
  self.data = {};
  self.data.account = {};
  self.data.creditCards = {};

  self.init = function() {
    self.data.account = authService.getUser();
    self.getAllByAccount();
  };

  self.getAllByAccount = function() {
    let account = self.data.account;
    creditCardsService.getAllByAccount(account, function(creditcards) {
      self.data.creditCards = creditcards;
    });
  };

  self.remove = function(index) {
    let creditCardId = self.data.creditCards[index]._id;
    creditCardsService.remove(creditCardId, function() {
      self.data.creditCards.splice(index, 1);
    });
  };

  self.init();
}]);