'use strict';

appServices.factory('CommunityService', ['$http', '$q', function ($http, $q) {
  return {
    getAll: function(callback) {
      $http
        .get('http://localhost:3000/community')
        .success(function(response) {
          let news = response.data.news;
          if(news) {
            return callback(news);
          } else {
            return callback(false);
          }
        })
        .error(function(response) {
          return callback(false);
        });
    }
  }
}]);