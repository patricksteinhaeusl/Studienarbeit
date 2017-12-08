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
    if(creditCardId) {
      creditCardService.getById(creditCardId, function(data) {
        self.data.creditCard = data;
      });
    }
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
    creditCardService.insert(creditCard, function(error, data, message, validations) {
      if(error) self.insert.messages.error = error;
      if(validations) self.insert.validations = validations;
      if(!data) self.insert.messages.warning = message;
      if(data) {
        self.data.creditCard = {};
        self.insert.messages.success = message;
        $location.path('/creditcards');
      }

      $timeout(function() {
        self.insert.messages = {};
        self.insert.validations = {};
      }, 5000);
    });
    /*creditCardService.insert(creditCard, function(data) {
      self.data.creditCard = data;
      $location.path('/creditcards');
    });*/
  };

  self.init();
}]);