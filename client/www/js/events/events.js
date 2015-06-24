//similar to shortly.links
angular.module( 'starter.eventscreation', ['starter.services'] )

.controller( 'EventsController', function ( $scope, Events, LocationService ) {
	$scope.eventData = {};

	$scope.newEvent = function() {
		LocationService.getlongLat().then(function ( coordinates ){
			$scope.eventData.coordinates = coordinates
			Events.newEvent( $scope.eventData )
			.then( function ( text ) {
				$location.path('/events');
			})
			.catch( function ( error ) {
				console.log( $scope.eventData )
				console.log( "error adding new event data: " + error );
			});
		});
	};
});
