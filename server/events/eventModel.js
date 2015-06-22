var mongoose = require('mongoose');

var EventSchema = new mongoose.Schema({
 text: String,
 votes: Number
});

module.exports = mongoose.model('Event', EventSchema);
