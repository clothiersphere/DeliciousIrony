var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  /*
    _id represents the user id. This field
    is the Facebook id used to login.
    Overrides default Mongo Object Id
  */
  _id: { type: String, required: true, unique: true },

  /*
    first_name represents first_name on user's Facebook
  */
  first_name: { type: String, required: true },

  /*
    last_name represents last_name on user's Facebook
  */
  last_name: { type: String, required: true },

  /*
    email represents email on user's Facebook
  */
  email: { type: String, required: true }
});

module.exports = mongoose.model('users', UserSchema);
