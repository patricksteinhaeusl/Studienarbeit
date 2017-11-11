'use strict';

appServices.factory('OrdersService', ['$http', '$q', function ($http, $q) {
  return {
    getAllByAccount: function(accountId, callback) {
      $http
        .get('http://localhost:3000/order/account/' + accountId)
        .success(function(response) {
          let orders = response.data.orders;
          if(orders) {
            return callback(orders);
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