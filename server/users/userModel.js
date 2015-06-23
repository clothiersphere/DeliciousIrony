var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  fb_id: { type: String, required: true, unique: true },  
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true },
  username: { type: String, required: true, unique: true }
});

module.exports = mongoose.model('users', UserSchema);
