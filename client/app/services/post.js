'use strict';

appServices.factory('PostService', ['$http', function ($http) {
  return {
    getAll: function(callback) {
      $http
        .get('http://localhost:3000/post')
        .success(function(response) {
          let posts = response.data.posts;
          if(posts) {
            return callback(posts);
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