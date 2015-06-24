var mongoose = require('mongoose');
var Event = require('./../events/eventModel');
var Q = require('q');

/*
The 'type' field refers to an upvote or a downvote. 
A value of -1 indicates a downvote. 
A value of 1 indicates an upvote.
*/

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
var VoteSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  eventId: { type: ObjectId, required: true},
  type: { type: Number, required: true },
  created_at: { type: Date },
  event_created_at: { type: Date }
});

module.exports = mongoose.model('votes', VoteSchema);
