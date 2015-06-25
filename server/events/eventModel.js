var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EventSchema = new mongoose.Schema({
  
  /*
    description represents a text description of the Event. This field is 
    direct input from the User who is creating the Event  
  */
  description: { type: String, required: true },
  
  /*
    created_at is a DateTimeStamp representing the moment the Event was created
    via the POST request to /api/events
  */
  created_at: { type: Date },
  
  /*
    loc stores the coordinates of the Event
  */
  loc: { type: { type: String }, coordinates: []},
  
  /*
    user is the '_id' of the User Model that created 
    this Event
  */
  user: { type: String, ref: 'users', required: true },
  
  /*
    votes is an array of Vote Model '_id'
  */
  votes: [{ type: Schema.Types.ObjectId, ref: 'votes'}]

});


/* This creates an additional index at the loc field. 
This enables users to find $near event locations */
EventSchema.index({loc: '2dsphere'});

module.exports = mongoose.model('events', EventSchema);
