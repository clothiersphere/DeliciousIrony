var Event = require('./eventModel');
var Q = require('q');

module.exports = {
  extract: function(req, res, next) {
    /*
    extract() is used when the Server receives a GET request at /api/events
    Finding all Event Documents that have a 'created_at' value
    greater than 12 hours ago from the current time.
    
    .populate() does the following:
      1. The 'user' field of each returned Event Document will be populated by the
        corresponding User document, which represents the User who created the Event 
      2. The 'votes' field of each returned Event Document will be populated by an 
        Array of all corresponding Votes that have been made regarding that Event
    */

    var lastTime = new Date();
    lastTime.setHours(lastTime.getHours() - 12);
    
    Event.find({ "created_at": { $gt : lastTime}})
    .populate('user votes')
    .exec(function (err, events) {
      if (err) {
        console.log("Error in Find Event");
        console.log(err);
        return;
      }
      console.log("printing out events");
      console.log(events)
      res.json({ events: events });
    });
  }, 

  add: function(req, res, next) {
    /*
      add() is used when the Server receives a POST request at /api/events

      This will add a new Event Document to the 'events' Collection.
    */
    var description = req.body.description,
        coordinates = req.body.coordinates,
        userId = req.body.userId;
   
    var createEvent = Q.nbind(Event.create, Event);
    var newEvent = {
          description: description, 
          loc: { 
            type: 'Point', 
            coordinates: coordinates
          }, 
        user: userId 
    };

    createEvent(newEvent).then(function(event){
      var now = new Date();
      if ( !event.created_at ) {
        event.created_at = now;
      }
      event.save(function(err, eventSaved) {
        console.log("event successfully created");
        console.log(eventSaved);
        res.sendStatus(201);
      });
    })
    .fail(function(err) {
      console.log(err);
      next(err);
    });
  }
};
