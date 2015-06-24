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
  userId: { type: Number, required: true },
  eventId: { type: ObjectId, required: true},
  type: { type: Number, required: true },
  created_at: { type: Date },
  event_created_at: { type: Date }
});

VoteSchema.pre('save', function(next) {
  var now = new Date();
  if ( !this.created_at ) {
    this.created_at = now;
  }
  if ( !this.event_date ) {
    var findOneEvent = Q.nbind(Event.findOne, Event);
    findOneEvent.apply(this,{ "_id" : this.eventId })
    .then(function(event) {
      this.event_created_at = event.created_at;
      this.save();
    }.bind(this))
    .fail(function(err) {
      console.log(err);
      return;
    });
  }
  next();
});


module.exports = mongoose.model('votes', VoteSchema);
