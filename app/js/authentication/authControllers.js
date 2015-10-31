authControllers.controller('authCtrl', ['$rootScope','$scope', '$location', '$window', 'UserService', 'AuthenticationService',
function authCtrl($rootScope,$scope, $location, $window, UserService, AuthenticationService) {
  //Admin User Controller (login, logout)
  $scope.logIn = function logIn(username, password) {
    if (username !== undefined && password !== undefined) {
      UserService.logIn(username, password).success(function(data) {
        AuthenticationService.isAuthenticated = true;
        $window.sessionStorage.token = data.token;
        $location.path("/me");
      }).error(function(status, data) {
        console.log(status);
        console.log(data);
        $rootScope.error = status;
      });
    }
  }
  $scope.me = function() {
    UserService.me().success(function(res) {
      $scope.myDetails = res.data;
    }).error(function(status,data) {
      console.log('Failed to fetch details');
      $rootScope.error = status;
      if(data == 401)
      {
        delete $window.sessionStorage.token;
        AuthenticationService.isAuthenticated = false;
        $location.path("/login");
      }
    });
  }
  $scope.logout = function logout() {
    if (AuthenticationService.isAuthenticated) {
      UserService.logOut().success(function(data) {
        AuthenticationService.isAuthenticated = false;
        delete $window.sessionStorage.token;
        $location.path("/");
      }).error(function(status, data) {
        console.log(status);
        console.log(data);
      });
    }
    else {
      $location.path("/login");
    }
  }
  $scope.register = function register(username, password, passwordConfirm) {
    if (AuthenticationService.isAuthenticated) {
      $location.path("/me");
    }
    else {
      UserService.register(username, password, passwordConfirm).success(function(data) {
        $location.path("/login");
      }).error(function(status, data) {
        console.log(status);
        console.log(data);
        $rootScope.error = status;
      });
    }
  }
  $rootScope.token = $window.sessionStorage.token;
}]);
