'use strict';

appServices.factory('CreditCardService', ['$http', function ($http) {
  return {
    getById: function(creditCardId, callback) {
      $http
        .get('http://localhost:3000/creditcard/' + creditCardId)
        .success(function(response) {
          let creditCard = response.data.creditCard;
          if(creditCard) {
            return callback(creditCard);
          } else {
            return callback(false);
          }
        })
        .error(function(response) {
          return callback(false);
        });
    },
    update: function(creditCard, callback) {
      let data = { creditCard: creditCard };
      $http
        .put('http://localhost:3000/creditcard/', data)
        .success(function(response) {
          let creditCard = response.data.creditCard;
          if(creditCard) {
            return callback(creditCard);
          } else {
            return callback(false);
          }
        })
        .error(function(response) {
          return callback(false);
        });
    },
    insert: function(creditCard, callback) {
      let data = { creditCard: creditCard };
      $http
        .post('http://localhost:3000/creditcard/', data)
        .success(function(response) {
          let creditCard = response.data.creditCard;
          if(creditCard) {
            return callback(creditCard);
          } else {
            return callback(false);
          }
        })
        .error(function(response) {
          return callback(false);
        });
    }
  }
}]);