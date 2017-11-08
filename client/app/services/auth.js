'use strict';

appServices.factory('AuthService', ['$http', '$q', 'localStorageService', function ($http, $q, localStorageService) {
  return {
    login: function(user, callback) {
      let data = user;
      $http
        .post('http://localhost:3000/auth/login', data)
        .success(function(response) {
          let user = response.data.user;
          let token = response.data.token;
          if(user && token) {
            localStorageService.set('user', user);
            localStorageService.set('token', token);
            $http.defaults.headers.common.Authorization = 'Bearer ' + token;
            return callback(true);
          } else {
            return callback(false);
          }
        })
        .error(function(response) {
            return callback(false);
        });
    },
    register: function(account, callback) {
      let data = account;
      $http
        .post('http://localhost:3000/auth/register', data)
        .success(function(response) {
          let user = response.data.user;
          let token = response.data.token;
          if(user && token) {
            localStorageService.set('user', user);
            localStorageService.set('token', token);
            $http.defaults.headers.common.Authorization = 'Bearer ' + token;
            return callback(true);
          } else {
            return callback(false);
          }
        })
        .error(function(response) {
          return callback(false);
        });
    },
    logout: function() {
      localStorageService.remove('token');
      localStorageService.remove('user');
      console.log(localStorageService.keys());
      $http.defaults.headers.common.Authorization = '';
    },
    isAuthenticated: function() {
      if(localStorageService.get('token')) {
        return true;
      } else {
        return false;
      }
    },
    getUser: function() {
      if (localStorageService.get('token')) {
        return localStorageService.get('user');
      }
    }
  }
}]);