var Event = require('./eventModel');
var Q = require('q');

Event.create({
    description: "Ashwin's party", 
    loc: { 
            type: 'Point', 
            coordinates: [ -122.49, 37.9 ]
          }, 
    userId: 123 
  }, function(err) {
    if(err) {
      console.log("error on event creation", err);
      return;
    }  
});


module.exports = {
  extract: function(req, res, next) {

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
        userId: userId 
    };

    createEvent(newEvent).then(function(event){
      console.log("event successfully created");
      console.log(event);
      res.sendStatus(201);
    })
    .fail(function(err) {
      console.log(err);
      next(err);
    });
  }
};
