'use strict';

appServices.factory('AuthService', ['$http', '$q', 'localStorageServiceProvider', function ($http, $q, localStorageProvider) {
  return {
    login: function(user, callback) {
      $http
        .post('http://localhost:3000/auth/login/', user)
        .success(function(response) {
          if(response.data.user && response.data.token) {
            localStorageService.set('user', response.data.user);
            localStorageService.set('token', response.data.token);
            return callback(null, response.data);
          } else {
            return callback(response);
          }
        })
        .error(function(errResponse) {
            return callback(errResponse);
        });
    }
  }
}]);