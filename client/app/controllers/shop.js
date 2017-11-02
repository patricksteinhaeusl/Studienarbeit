'use strict';

appControllers.controller('ShopController', ['$scope', 'ShopService', 'localStorageService', function($scope, shopService, localStorageService) {
  const self = this;
  self.products = {};

  self.init = function () {
    self.getProducts();
  };

  self.getProducts = function() {
    shopService.getProducts(function(products) {
      self.products = products;
    });
  };

  self.getRating = function() {
    shopService.getRating(function(rating) {
      return rating;
    });
  };

  self.rateProduct = function(product, ratingValue) {
    if(localStorageService.get('user')) {
      let user = localStorageService.get('user');
      shopService.rateProduct(product, ratingValue, user, function() {
        console.log("Rated");
      });
    }
  };

  self.init();
}]);