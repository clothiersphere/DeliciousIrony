var Event = require('./eventModel');
var Q = require('q');
/*
Event.create({
    description: "Ashwin's party", 
    loc: { 
            type: 'Point', 
            coordinates: [ -122.49, 37.9 ]
          }, 
    userId: "555" 
  }, function(err) {
    if(err) {
      console.log("error on event creation", err);
      return;
    }  
});
*/


module.exports = {
  extract: function(req, res, next) {
    var lastTime = new Date();
    lastTime.setHours(lastTime.getHours() - 12);
    
    /*
    Searching for all Events that have a 'created_at' value
    greater than 12 hours ago from the current time.
    
    .populate() does the following:
      1. The 'user' field of each returned Event Document will be populated by the
        corresponding User document, which represent the User who created the Event 
      2. The 'votes' field of each returned Event Document will be populated by an 
        array of all corresponding Votes that have been made regarding that Event
    */
    
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
