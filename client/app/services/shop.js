'use strict';

appServices.factory('ShopService', ['$http', '$q', function ($http, $q) {
  return {
    getProducts: function(callback) {
      $http
        .get('http://localhost:3000/product')
        .success(function(response) {
          let products = response.data.products;
          return callback(products);
        })
        .error(function(response) {
          return callback(false);
        });
    },
    rateProduct: function(product, ratingValue, user, callback) {
      let data = { 'product': product, 'ratingValue': ratingValue, 'user': user };
      $http
        .post('http://localhost:3000/product/rating', data)
        .success(function(response) {
          let products = response.data.products;
          return callback(products);
        })
        .error(function(response) {
          return callback(false);
        });
    }
  }
}]);