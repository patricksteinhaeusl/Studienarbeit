'use strict';

appServices.factory('DeliveryAddressesService', ['$http', function ($http) {
  return {
    getAllByAccount: function(account, callback) {
      $http
        .get('http://localhost:3000/deliveryaddress/account/' + account._id)
        .success(function(response) {
          let deliveryAddresses = response.data.deliveryAddresses;
          if(deliveryAddresses) {
            return callback(deliveryAddresses);
          } else {
            return callback(false);
          }
        })
        .error(function(response) {
          return callback(false);
        });
    },
    remove: function(deliveryAddressId, callback) {
      $http
        .delete('http://localhost:3000/deliveryaddress/' + deliveryAddressId)
        .success(function(response) {
          return callback(true);
        })
        .error(function(response) {
          return callback(false);
        });
    }
  }
}]);