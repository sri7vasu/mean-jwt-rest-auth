'use strict';

var app = angular.module('app', ['ngRoute', 'authControllers', 'authServices']);
var authControllers = angular.module('authControllers', []);
var authServices = angular.module('authServices', []);

var options = {};
options.api = {};
//dev URL
options.api.base_url = "http://localhost:3000";

app.config(['$locationProvider', '$routeProvider',
function($location, $routeProvider) {
  $routeProvider.
  when('/', {
    templateUrl: 'views/partials/home.html',
    controller: 'authCtrl'
  }).
  when('/login', {
    templateUrl: 'views/partials/signin.html',
    controller: 'authCtrl'
  }).
  when('/register', {
    templateUrl: 'views/partials/signup.html',
    controller: 'authCtrl'
  }).
  when('/me', {
    templateUrl: 'views/partials/me.html',
    controller: 'authCtrl'
  }).
  otherwise({
    redirectTo: '/'
  });
}]);
app.config(['$httpProvider', function ($httpProvider) {
  $httpProvider.interceptors.push('TokenInterceptor');
}]);
app.run(function($rootScope, $location, $window, AuthenticationService) {
  $rootScope.$on("$routeChangeStart", function(event, nextRoute, currentRoute) {
    //redirect only if both isAuthenticated is false and no token is set
    if (nextRoute != null && nextRoute.access != null && nextRoute.access.requiredAuthentication
      && !AuthenticationService.isAuthenticated && !$window.sessionStorage.token) {
        $location.path("/login");
      }
      //if the user is logged in and trying to navigate to register page, redirect to home page
      var laststring = $location.path().split(/[\s/]+/).pop();
      if(AuthenticationService.isAuthenticated && $window.sessionStorage.token && laststring=="register"){
          $location.path("/");
      }
      // //if the user is not logged in and trying tonavigate to me page, redirect to login page
      if(!AuthenticationService.isAuthenticated && !$window.sessionStorage.token && laststring=="me"){
          $location.path("/login");
      }
    });
  });
