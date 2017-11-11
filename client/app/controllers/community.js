'use strict';

appControllers.controller('CommunityController', ['$scope', 'CommunityService', function($scope, communityService) {
  console.log("CommunityController");
  const self = this;
  self.data = {};
  self.data.community = [];

  self.init = function() {
  };

  self.init();
}]);