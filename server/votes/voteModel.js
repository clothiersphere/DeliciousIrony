var mongoose = require('mongoose');

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
});

VoteSchema.pre('save', function(next) {
  var now = new Date();
  if ( !this.created_at ) {
    this.created_at = now;
  }
  next();
});


module.exports = mongoose.model('votes', VoteSchema);
