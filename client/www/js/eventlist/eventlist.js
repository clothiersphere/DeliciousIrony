angular.module('starter.eventlist', [])

.controller('EventListController', function ($scope, Events) {

  $scope.data = {};

  $scope.getEvents = function(){
    // must use promise .then here
    Events.getEvents().then(function(events){
      $scope.data.events = events;
    });
  };

  $scope.init = function() {
    $scope.getEvents();
  };

  $scope.init();

});
