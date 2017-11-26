'use strict';

appControllers.controller('CreditCardController', ['$scope', '$location', '$routeParams', 'CreditCardService', 'AuthService', function($scope, $location, $routeParams, creditCardService, authService) {
  const self = this;
  self.data = {};
  self.data.creditCard = {};

  self.init = function() {
    self.getById();
  };

  self.getById = function() {
    let creditCardId = $routeParams.creditCardId;
    creditCardService.getById(creditCardId, function(data) {
      self.data.creditCard = data;
    });
  };

  self.update = function() {
    let creditCard = self.data.creditCard;
    creditCardService.update(creditCard, function(data) {
      self.data.creditCard = data;
      $location.path('/creditcards');
    });
  };

  self.insert = function() {
    let creditCard = self.data.creditCard;
    creditCard._account = authService.getUser()._id;
    creditCardService.insert(creditCard, function(data) {
      self.data.creditCard = data;
      $location.path('/creditcards');
    });
  };

  self.init();
}]);