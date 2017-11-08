'use strict';

appServices.factory('CreditCardsService', ['$http', function ($http) {
  return {
    getAllByAccount: function(account, callback) {
      $http
        .get('http://localhost:3000/creditcard/account/' + account._id)
        .success(function(response) {
          let creditCards = response.data.creditCards;
          if(creditCards) {
            return callback(creditCards);
          } else {
            return callback(false);
          }
        })
        .error(function(response) {
          return callback(false);
        });
    },
    remove: function(creditCardId, callback) {
      $http
        .delete('http://localhost:3000/creditcard/' + creditCardId)
        .success(function(response) {
          return callback(true);
        })
        .error(function(response) {
          return callback(false);
        });
    }
  }
}]);