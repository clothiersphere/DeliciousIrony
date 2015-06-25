//similar to shortly.links
angular.module( 'starter.eventscreation', ['starter.services'] )

.controller( 'EventsController', function ( $scope, $location, Events, LocationService, Config) {
	$scope.eventData = {};

	$scope.newEvent = function() {
		LocationService.getlongLat().then(function ( coordinates ){
			$scope.eventData.coordinates = coordinates;
			console.log("Config user " + Config.getUserId());
			$scope.eventData.userId = Config.getUserId();
			Events.newEvent( $scope.eventData )
			.then( function ( text ) {
				$location.path('/eventlist');
			})
			.catch( function ( error ) {
				console.log( $scope.eventData )
				console.log( "Error adding new event data: " + error );
			});
		});
	};
});
