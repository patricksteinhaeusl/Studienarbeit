'use strict';

appControllers.controller('OrderController', ['$scope', '$location', 'OrderService', 'AuthService', 'CartService', function($scope, $location, orderService, authService, cartService) {
  const self = this;

  self.data = {};
  self.data.order = {};
  self.data.order.deliveryAddress = null;
  self.data.order.creditCard = null;

  self.initOverview = function() {
    self.data.order.items = cartService.getItems();
    self.data.order.totalPrice = cartService.getTotalPrice();

    if(!self.data.order.items || self.data.order.items.length === 0) {
      $location.path( '/shop' );
    }
  };

  self.goToOverview = function() {
    $location.path( '/checkout/overview' );
  };

  self.goToAddress = function() {
    $location.path( '/checkout/address' );
  };

  self.goToPayment = function() {
    $location.path( '/checkout/payment' );
  };

  self.save = function() {
    self.data.order._account = authService.getUser()._id;
    self.data.order.status = 'new';
    orderService.save(self.data.order, function(order) {
      self.data.order = {};
      cartService.clear();
      $location.path( '/orders' );
    });
  };

  $scope.$watch(function() { return cartService.getItems() }, function(items) {
    self.data.order.items = cartService.getItems();
    self.data.order.totalPrice = cartService.getTotalPrice();
  }, true);

  self.initOverview();

}]);