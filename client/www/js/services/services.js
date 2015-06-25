angular.module('starter.services', ['ngOpenFB'])

.factory('Auth', function ($http, $location, $window) {
  // Don't touch this Auth service!!!
  // it is responsible for authenticating our user
  // by exchanging the user's username and password
  // for a JWT from the server
  // that JWT is then stored in localStorage as 'com.shortly'
  // after you signin/signup open devtools, click resources,
  // then localStorage and you'll see your token from the server
  var signin = function (user) {
    return $http({
      method: 'POST',
      url: '/api/user',
      data: user
    })
    .then(function (resp) {
      return resp.data;
    });
  };

  var signout = function () {
    $window.localStorage.removeItem( 'com.shortly' );
    $location.path('/signin');
  };
  return {
    signin: signin,
    signout: signout
  };
})

.factory('Events', function ( $http, $location, $window ) {
 
  var newEvent = function ( eventData ){
    return $http({
      method: 'POST',
      url: '/api/events',
      data: eventData
    })
    .then(function (resp) {
      console.log("Response for new event: " + JSON.stringify(resp));
      return resp.data;
    });
  }

  var getEvents = function () {
    return $http({
      method: 'GET',
      url: '/api/events'
    })
    .then(function(resp) {
      return resp.data;
    });
  }

  var voteEvent = function(voteData) {
    console.log("Vote Data: " + JSON.stringify(voteData));
    return $http({
      method: 'POST',
      url: '/api/votes',
      data: voteData
    })
    .then(function(resp) {
      return resp.data;
    });
  }

  return {
    newEvent: newEvent,
    getEvents: getEvents,
    voteEvent: voteEvent
  };
})

.factory('LocationService', function($q) {
    
    var longLat = null;
    
    var getlongLat = function(refresh) {
        
        var deferred = $q.defer();
        
        if( longLat === null || refresh ) {
            navigator.geolocation.getCurrentPosition(function(pos) {
                // longLat =  { 'lat' : pos.coords.latitude, 'long' : pos.coords.longitude } 
                longLat =  [pos.coords.longitude,pos.coords.latitude ]
                deferred.resolve(longLat);

            }, function(error) {
                console.log('Got error!');
                console.log(error);
                longLat = null
                
                deferred.reject('Failed to Get Lat Long')
            });  
        }  else {
            deferred.resolve(longLat);
        }
        return deferred.promise;  
    };      
    return {  
        getlongLat : getlongLat
    };
})

.factory('Token', function($window,$location, ngFB) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    signout: function() {
      $window.localStorage.clear();
      $window.sessionStorage.clear();
      $location.path('/signin');
    }
  }
});


