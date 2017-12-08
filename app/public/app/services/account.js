'use strict';

appServices.factory('AccountService', ['$http', '$q', 'localStorageService', function ($http, $q, localStorageService) {
  return {
    update: function(account, callback) {
      let data = { account: account };
      $http
        .put('http://localhost:3000/api/account', data)
        .then(function(response) {
          let user = response.data.data.user;
          let token = response.data.data.token;
          if(user && token) {
            localStorageService.set('user', user);
            localStorageService.set('token', token);
            $http.defaults.headers.common.Authorization = 'Bearer ' + token;
            return callback(user);
          } else {
            return callback(false);
          }
        }, function(response) {
          return callback(false);
        });
    }
  };
}]);