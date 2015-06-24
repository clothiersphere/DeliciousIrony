var mongoose = require('mongoose');
var Event = require('./../events/eventModel');
var Q = require('q');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var VoteSchema = new mongoose.Schema({

  /*
    The userId field holds the UserId for the User
    what made the Vote
  */
  userId: { type: String, required: true },
  
  /*
    The eventId holds the _id of the Event that the
    Vote is for
  */
  eventId: { type: ObjectId, required: true},

  /*
    The type field holds a Number value used to indcate 
    whether the Vote is an Upvote or Downvote
    
    A value of -1 indicates the Vote is a Downvote. 
    A value of 1 indicates the Vote is an Dpvote.

    Any values other than -1 or 1 have no meaning
  */
  type: { type: Number, required: true },

  /*
    The created_at field is a DateTimeStamp representing the 
    moment the Vote was created via a POST request to /api/votes
  */
  created_at: { type: Date },
  
  /*
    The event_created_at field is a DateTimeStamp 
    for when the corresponding Event was first inserted into
    the 'events' colection
  */
  event_created_at: { type: Date }

});

module.exports = mongoose.model('votes', VoteSchema);
