'use strict';

appControllers.controller('NavController', function($scope) {
  const self = this;

  self.collapseNavigation = function(elementClass) {
    $(function() {
      if($(elementClass).is(':visible')) {
        $scope.$slider = $(elementClass).slideUp();
      } else {
        $scope.$slider = $(elementClass).slideDown();
      }
    });
  };
});