'use strict';

appServices.factory('OrderService', ['$http', '$q', function ($http, $q) {
  return {
    save: function(order, callback) {
      let data = { 'order': order };
      $http
        .post('http://localhost:3000/order', data)
        .success(function(response) {
          return callback(true);
        })
        .error(function(response) {
          return callback(false);
        });
    }
  }
}]);