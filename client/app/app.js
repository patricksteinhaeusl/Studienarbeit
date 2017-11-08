'use strict';

let app = angular.module('app',[
  'ngRoute',
  'LocalStorageModule',
  'ui.bootstrap',
  'jkAngularRatingStars',
  'app.controllers',
  'app.services',
])
.config(['$locationProvider', '$routeProvider', 'localStorageServiceProvider', function($locationProvider, $routeProvider, localStorageServiceProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider
    .when('/home', {
      templateUrl: 'views/home.html'
    })
    .when('/aboutus', {
      templateUrl: 'views/aboutUs.html'
    })
    .when('/contact', {
      templateUrl: 'views/contact.html'
    })
    .when('/shop', {
      templateUrl: 'views/shop.html'
    })
    .when('/shop/category/:categoryId', {
      templateUrl: 'views/shop.html'
    })
    .when('/auth/register', {
      templateUrl: 'views/register.html'
    })
    .when('/account', {
      templateUrl: 'views/account.html'
    })
    .when('/creditcards', {
      templateUrl: 'views/creditCards.html'
    })
    .when('/creditcard', {
      templateUrl: 'views/creditCard-add.html'
    })
    .when('/creditcard/:creditCardId', {
      templateUrl: 'views/creditCard-edit.html'
    })
    .when('/deliveryaddresses', {
      templateUrl: 'views/deliveryAddresses.html'
    })
    .when('/deliveryaddress', {
      templateUrl: 'views/deliveryAddress-add.html'
    })
    .when('/deliveryaddress/:deliveryAddressId', {
      templateUrl: 'views/deliveryAddress-edit.html'
    });

  $routeProvider.otherwise({redirectTo: '/home'});

  localStorageServiceProvider
    .setPrefix('app')
    .setStorageType('localStorage');
}]).run(function($http, localStorageService) {
  if(localStorageService.get('token')) {
    $http.defaults.headers.common.Authorization = 'Bearer ' + localStorageService.get('token');
  }
});

let appControllers = angular.module('app.controllers', []);
let appServices = angular.module('app.services', []);