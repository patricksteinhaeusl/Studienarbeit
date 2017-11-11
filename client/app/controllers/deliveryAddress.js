'use strict';

appControllers.controller('DeliveryAddressController', ['$scope', '$location', '$routeParams', 'DeliveryAddressService', 'AuthService', function($scope, $location, $routeParams, deliveryAddressService, authService) {
  console.log("DeliveryAddressController");
  const self = this;
  self.data = {};
  self.data.deliveryAddress = {};

  self.init = function() {
    self.getById();
  };

  self.getById = function() {
    let deliveryAddressId = $routeParams.deliveryAddressId;
    deliveryAddressService.getById(deliveryAddressId, function(data) {
      self.data.deliveryAddress = data;
    });
  };

  self.update = function() {
    let deliveryAddress = self.data.deliveryAddress;
    deliveryAddressService.update(deliveryAddress, function(data) {
      self.data.deliveryAddress = data;
      $location.path('/deliveryaddresses');
    });
  };

  self.insert = function() {
    let deliveryAddress = self.data.deliveryAddress;
    console.log(deliveryAddress);
    deliveryAddress._account = authService.getUser()._id;
    deliveryAddressService.insert(deliveryAddress, function(data) {
      self.data.deliveryAddress = data;
      $location.path('/deliveryaddresses');
    });
  };

  self.init();
}]);