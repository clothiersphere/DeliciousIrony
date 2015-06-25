angular.module('starter.eventlist', [])

.controller('EventListController', function ($scope, Events, Config) {

  $scope.data = {};
  $scope.vote = {};

  $scope.getEvents = function(){
    Events.getEvents().then(function(events){
      console.log("Events in eventlist: " + JSON.stringify(events.events));
      $scope.data.events = events.events;
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
          if (vote.userId === Config.getUserId()) {
            event.alreadyVoted = true;
          }
        })
      })
    });
  };

  $scope.upvote = function(event) {
    console.log("Clicked event: " + JSON.stringify(event));
    console.log("Config.userId " + Config.getUserId());
    $scope.vote.userId = Config.getUserId();
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
    $scope.vote.userId = Config.getUserId();
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

  $scope.init = function() {
    $scope.getEvents();
  };

  $scope.init();

});
