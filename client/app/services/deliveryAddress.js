'use strict';

appServices.factory('DeliveryAddressService', ['$http', function ($http) {
  return {
    getById: function(deliveryAddressId, callback) {
      $http
        .get('http://localhost:3000/deliveryaddress/' + deliveryAddressId)
        .then(function(response) {
          let deliveryAddress = response.data.data.deliveryAddress;
          if(deliveryAddress) {
            return callback(deliveryAddress);
          } else {
            return callback(false);
          }
        }, function(response) {
          return callback(false);
        });
    },
    update: function(deliveryAddress, callback) {
      let data = { deliveryAddress: deliveryAddress };
      $http
        .put('http://localhost:3000/deliveryaddress/', data)
        .then(function(response) {
          let deliveryAddress = response.data.data.deliveryAddress;
          if(deliveryAddress) {
            return callback(deliveryAddress);
          } else {
            return callback(false);
          }
        }, function(response) {
          return callback(false);
        });
    },
    insert: function(deliveryAddress, callback) {
      let data = { deliveryAddress: deliveryAddress };
      $http
        .post('http://localhost:3000/deliveryaddress/', data)
        .success(function(response) {
          let creditCard = response.data.deliveryAddress;
          if(deliveryAddress) {
            return callback(deliveryAddress);
          } else {
            return callback(false);
          }
        })
        .error(function(response) {
          return callback(false);
        });
    },
  }
}]);