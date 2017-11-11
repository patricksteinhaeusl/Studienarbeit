'use strict';

appControllers.controller('CartController', ['$scope', 'CartService', function($scope, cartService) {
  console.log("CartController");
  const self = this;

  self.data = {};
  self.data.items = cartService.getItems();
  self.data.totalPrice = cartService.getTotalPrice();

  self.insert = function(product) {
    cartService.insert(product);
  };

  self.remove = function(itemIndex) {
    cartService.remove(itemIndex);
  };

  $scope.$watch(function() { return cartService.getItems() }, function (items) {
    if(items) self.data.totalPrice = cartService.getTotalPrice();
  }, true);
}]);