'use strict';

let app = angular.module('app',[
  'ngRoute',
  'app.controllers'
])
.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
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
}]);

let appControllers = angular.module('app.controllers', []);