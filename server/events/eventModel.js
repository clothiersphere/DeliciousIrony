var mongoose = require('mongoose');

var EventSchema = new mongoose.Schema({
  description: { type: String, required: true },
  created_at: { type: Date },
  loc: { type: { type: String }, coordinates: []},
  userId: { type: Number, required: true }
});

//This creates an additional index at the loc field. This enables users to find $near event locations 
EventSchema.index({loc: '2dsphere'});

EventSchema.pre('save', function(next) {
  var now = new Date();
  if ( !this.created_at ) {
    this.created_at = now;
  }
  next();
});

module.exports = mongoose.model('events', EventSchema);
