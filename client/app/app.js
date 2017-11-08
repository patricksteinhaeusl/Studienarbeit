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
    })
    .when('/shop', {
      templateUrl: 'views/shop.html',
      controller: 'ShopController'
    })
    .when('/shop/category/:categoryId', {
        templateUrl: 'views/shop.html',
        controller: 'ShopController'
    })
    .when('/auth/register', {
      templateUrl: 'views/register.html',
      controller: 'AuthController'
    })
    .when('/account', {
      templateUrl: 'views/account.html',
      controller: 'AccountController'
    })
    .when('/creditcards', {
      templateUrl: 'views/creditCards.html',
      controller: 'CreditCardsController'
    })
    .when('/creditcard', {
      templateUrl: 'views/creditCard-add.html',
      controller: 'CreditCardController'
    })
    .when('/creditcard/:creditCardId', {
      templateUrl: 'views/creditCard-edit.html',
      controller: 'CreditCardController'
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