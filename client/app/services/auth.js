'use strict';

appServices.factory('AuthService', ['$http', '$q', 'localStorageService', function ($http, $q, localStorageService) {
  return {
    login: function(user, callback) {
      let data = user;
      $http
        .post('http://localhost:3000/auth/login', data)
        .success(function(response) {
          let statusCode = response.statusCode;
          let data = response.data;
          let message = response.message;
          if(statusCode === 200) {
            let user = data.user;
            let token = data.token;
            localStorageService.set('user', user);
            localStorageService.set('token', token);
            $http.defaults.headers.common.Authorization = 'Bearer ' + token;
            let responseData = { user: user, token: token };
            return callback(null, responseData, message);
          }
          return callback(null, null, message);
        })
        .error(function(error) {
            return callback(error);
        });
    },
    register: function(account, callback) {
      let data = account;
      $http
        .post('http://localhost:3000/auth/register', data)
        .success(function(response) {
          let statusCode = response.statusCode;
          let data = response.data;
          let message = response.message;
          if(statusCode === 200) {
            let user = data.user;
            let token = data.token;
            localStorageService.set('user', user);
            localStorageService.set('token', token);
            $http.defaults.headers.common.Authorization = 'Bearer ' + token;
            let responseData = { user: user, token: token };
            return callback(null, responseData, message);
          }
          return callback(null, null, message);
        })
        .error(function(error) {
          return callback(error);
        });
    },
    logout: function(callback) {
      localStorageService.remove('token');
      localStorageService.remove('user');
      $http.defaults.headers.common.Authorization = '';
      return callback(null, true, 'Logout successfully');
    },
    isAuthenticated: function() {
      if(localStorageService.get('token') && localStorageService.get('user')) {
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