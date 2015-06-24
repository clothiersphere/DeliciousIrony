// do not tamper with this code in here, study it, but do not touch
// this Auth controller is responsible for our client side authentication
// in our signup/signin forms using the injected Auth service
angular.module('starter.auth', ['ngOpenFB'])

.controller('AuthController', function ($scope, $location, ngFB, Auth, Config) {
  
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.user = {};

  $scope.fbLogin = function () {
    ngFB.login({scope: 'email,read_stream,publish_actions'}).then(
        function (response) {
            if (response.status === 'connected') {
                console.log('Facebook login succeeded');
                ngFB.api({
                  path: '/me',
                  params: {fields: 'id,email,first_name,last_name'}
                }).then(
                  function (user) {
                    $scope.user = user;
                    Auth.signin($scope.user)
                      .then(function() {
                        Config.userId = $scope.user.id;
                        $location.path('/createevent');
                      })
                      .catch(function(error) {
                        console.log("Error in calling Auth.signin: " + error);
                      });
                  },
                  function (error) {
                    alert('Facebook error: ' + error.error_description);
                  });
            } else {
                alert('Facebook login failed');
            }
        });
  };
});
