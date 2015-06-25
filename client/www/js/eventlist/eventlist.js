angular.module('starter.eventlist', ['angularMoment'])

.controller('EventListController', function ($scope, $q, $location, Events, LocationService, Token) {

  $scope.data = {};
  $scope.vote = {};
  $scope.ready = false;

  $scope.getEvents = function(){
    Events.getEvents().then(function(events){
      console.log("Events in eventlist: " + JSON.stringify(events.events));
      $scope.data.events = events.events;
      var prom = [];
      $scope.data.events.forEach(function(event) {
        event.upvoteCount = 0;
        event.downvoteCount = 0;
        event.alreadyVoted = false;
        event.votes.forEach(function(vote) {
          if (vote.type === 1) {
            event.upvoteCount++;
          } else {
            event.downvoteCount++;
          }
          if (vote.userId === Token.get('userId')) {
            event.alreadyVoted = true;
          }
        });
        prom.push(LocationService.getlongLat().then(function(coordinates) {
          console.log("Current coordinates: " + coordinates);
          console.log("Event coordinates: " + event.loc.coordinates);
          event.distance = $scope._calcDistance(coordinates[1], coordinates[0], event.loc.coordinates[1], event.loc.coordinates[0]);
        }));
      });
      $q.all(prom).then(function() {
        $scope.ready = true;
      });
    });
  };

  $scope.upvote = function(event) {
    console.log("Clicked event: " + JSON.stringify(event));
    console.log("Config.userId " + Token.get('userId'));
    $scope.vote.userId = Token.get('userId');
    $scope.vote.eventId = event._id;
    $scope.vote.type = 1;
    Events.voteEvent($scope.vote)
      .then(function() {
        $scope.getEvents();
      })
      .catch(function(error) {
        console.log("Error in calling Events.voteEvent: " + error);
      });      
  };

  $scope.downvote = function(event) {
    $scope.vote.userId = Token.get('userId');
    $scope.vote.eventId = event._id;
    $scope.vote.type = -1;
    Events.voteEvent($scope.vote)
      .then(function() {
        $scope.getEvents();
      })
      .catch(function(error) {
        console.log("Error in calling Events.voteEvent: " + error);
      });        
  };

  $scope._calcDistance = function(lat1, lon1, lat2, lon2) {
    var R = 6371000; // metres
    var φ1 = (lat1) * Math.PI / 180;
    var φ2 = (lat2) * Math.PI / 180;
    var Δφ = (lat2-lat1) * Math.PI / 180;
    var Δλ = (lon2-lon1) * Math.PI / 180;

    var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    var d = R * c * 0.000621371;
    var miles = +d.toFixed(1);

    return miles;
  };

  $scope.createEventModal = function() {
    $location.path('/createevent');
  }

  $scope.init = function() {
    $scope.ready = false;
    $scope.getEvents();
  };

  $scope.init();

});
