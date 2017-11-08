'use strict';

appControllers.controller('CartController', ['$scope', 'CartService', function($scope, cartService) {

  const self = this;
  self.data = cartService.getItems();
  self.data.totalPrice = cartService.getTotalPrice();
  console.log("wow " + self.data.totalPrice);

  self.insert = function(product) {
    cartService.insert(product);
  };

  return self;
}]);