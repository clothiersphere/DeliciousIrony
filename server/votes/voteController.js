var Vote = require('./voteModel');
var mongoose = require('mongoose');
var Q = require('q');



Vote.create({
    eventId: mongoose.Types.ObjectId("5589be0861245a103260d896"), 
    userId: 123, 
    type: 1 
  }, function(err) {
    if(err) {
      console.log("error on vote creation", err);
      return;
    }  
});


module.exports = {
  extract: function(req, res, next) {

  }, 

  add: function(req, res, next) {

  }
};
