'use strict';

appServices.factory('AccountService', ['$http', '$q', 'localStorageService', function ($http, $q, localStorageService) {
  return {
    update: function(account, callback) {
      let data = { account: account };
      $http
        .put('http://localhost:3000/api/account', data)
        .then(function(response) {
          let statusCode = response.data.statusCode;
          let data = response.data.data;
          let message = response.data.message;
          let validations = response.data.validations;
          if(statusCode === 200) {
            let user = data.user;
            let token = data.token;
            localStorageService.set('user', user);
            localStorageService.set('token', token);
            $http.defaults.headers.common.Authorization = 'Bearer ' + token;

            let responseData = { user: user, token: token };
            return callback(null, responseData, message, null);
          } else if(statusCode === 405) {
            return callback(null, null, null, validations);
          }
          return callback(null, null, message, null);
        }, function(error) {
          return callback(error);
        });
    }
  };
}]);