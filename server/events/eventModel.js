var mongoose = require('mongoose');

var EventSchema = new mongoose.Schema({
 description: { type: String, required: true },
 created_at: { type: Date },
 userId: { type: Number, required: true },
 location: { type: "Point", required: true }
});

EventSchema.pre('save', function(next) {
  now = new Date();
  if ( !this.created_at ) {
    this.created_at = now;
  }
  next();
});

module.exports = mongoose.model('Event', EventSchema);
