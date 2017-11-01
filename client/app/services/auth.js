'use strict';

appServices.factory('AuthService', ['$http', '$q', 'localStorageService', function ($http, $q, localStorageService) {
  return {
    login: function(user, callback) {
      $http
        .post('http://localhost:3000/auth/login/', user)
        .success(function(response) {
          if(response.data.user && response.data.token) {
            localStorageService.set('user', response.data.user);
            localStorageService.set('token', response.data.token);
            $http.defaults.headers.common.Authorization = 'Bearer ' + response.data.token;
            return callback(true);
          } else {
            return callback(false);
          }
        })
        .error(function(response) {
            return callback(false);
        });
    },
    register: function(user, callback) {
      $http
        .post('http://localhost:3000/auth/register/', user)
        .success(function(response) {
          if(response.data.user && response.data.token) {
            localStorageService.set('user', response.data.user);
            localStorageService.set('token', response.data.token);
            $http.defaults.headers.common.Authorization = 'Bearer ' + response.data.token;
            return callback(true);
          } else {
            return callback(false);
          }
        })
        .error(function(response) {
          return callback(false);
        });
    },
    logout: function(callback) {
      localStorageService.clearAll();
      $http.defaults.headers.common.Authorization = '';
      callback();
    }
  }
}]);