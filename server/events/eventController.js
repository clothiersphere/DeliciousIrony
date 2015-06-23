var Event = require('./eventModel');

Event.create({ description: "the fellas", userId: 123}, function(err, events) {
  console.log("the event was successfully created");
});

module.exports = {
  extract: function(req, res, next) {
    
  }, 
  add: function(req, res, next) {

  }
};
