var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EventSchema = new mongoose.Schema({
  description: { type: String, required: true },
  created_at: { type: Date },
  loc: { type: { type: String }, coordinates: []},
  /*
  user is the '_id' of the User Model that created 
  this Event model
  */
  user: { type: String, ref: 'users' },
  /*
  votes is an array of Vote Model '_id'
  */
  votes: [{ type: Schema.Types.ObjectId, ref: 'votes'}]
});


//This creates an additional index at the loc field. This enables users to find $near event locations 
EventSchema.index({loc: '2dsphere'});

module.exports = mongoose.model('events', EventSchema);
