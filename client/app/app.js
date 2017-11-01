'use strict';

let app = angular.module('app',[
  'ngRoute',
  'LocalStorageModule',
  'app.controllers',
  'app.services'
])
.config(['$locationProvider', '$routeProvider', 'localStorageServiceProvider', function($locationProvider, $routeProvider, localStorageServiceProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider
    .when('/home', {
      templateUrl: 'views/home.html',
      controller: 'HomeController'
    })
    .when('/aboutus', {
      templateUrl: 'views/aboutUs.html',
      controller: 'AboutUsController'
    })
    .when('/contact', {
      templateUrl: 'views/contact.html',
      controller: 'ContactController'
    });

  $routeProvider.otherwise({redirectTo: '/home'});

  localStorageServiceProvider
    .setPrefix('app')
    .setStorageType('localStorage');
}]).run(function($http, localStorageService) {
  if(localStorageService.token) {
    $http.defaults.headers.common.Authorization = 'Bearer ' + localStorageService.token;
  }
});

let appControllers = angular.module('app.controllers', []);
let appServices = angular.module('app.services', []);