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
    getProductsByCategory: function(categoryId, callback) {
      $http
        .get('http://localhost:3000/product/category/' + categoryId)
        .success(function(response) {
          let products = response.data.products;
          return callback(products);
        })
        .error(function(response) {
          return callback(false);
        });
    },
    getProductsTopRated: function(callback) {
      $http
        .get('http://localhost:3000/product/toprated/')
        .success(function(response) {
          let products = response.data.products;
          return callback(products);
        })
        .error(function(response) {
          return callback(false);
        });
    },
    getProductsBySearchValue: function(searchValue, callback) {
      $http
        .get('http://localhost:3000/product/searchValue/' + searchValue)
        .success(function(response) {
          let products = response.data.products;
          return callback(products);
        })
        .error(function(response) {
          return callback(false);
        });
    },
    getProductCategories: function(callback) {
      $http
        .get('http://localhost:3000/product/category')
        .success(function(response) {
          let categories = response.data.categories;
          return callback(categories);
        })
        .error(function(response) {
          return callback(false);
        });
    },
    rateProduct: function(product, rating, callback) {
      let data = { 'product': product, 'rating': rating };
      $http
        .post('http://localhost:3000/product/rating', data)
        .success(function(response) {
          return callback(true);
        })
        .error(function(response) {
          return callback(false);
        });
    }
  }
}]);