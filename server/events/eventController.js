var Event = require('./eventModel');

Event.create({ 
    description: "Ashwin's party", 
    loc: { 
            type: 'Point', 
            coordinates: [ -122.49, 37.9 ]
          }, 
    userId: 123 
  }, function(err) {
    if(err) {
      console.log("error on event creation", err);
      return;
    }  
});

module.exports = {
  extract: function(req, res, next) {
    
  }, 
  add: function(req, res, next) {
    
  }
};
