var Vote = require('./voteModel');
var mongoose = require('mongoose');
var Q = require('q');


/*
Vote.create({
    eventId: mongoose.Types.ObjectId("558a2fad6d52c2d866a07470"), 
    userId: 123, 
    type: 1 
  }, function(err) {
    if(err) {
      console.log("error on vote creation", err);
      return;
    }  
});

*/

module.exports = {
  extract: function(req, res, next) {

    var lastTime = new Date();
    lastTime.setHours(lastTime.getHours() - 12);
    
    var findVotes = Q.nbind(Vote.find, Vote);
    findVotes({ "event_created_at": { $gt : lastTime }})
    .then(function(votes) {
      console.log('Votes Successfully Extracted');
      res.json({ votes: votes });
    })
    .fail(function(error) {
      console.log("Vote Extraction failed");
      next(error);
    });

  }, 

  add: function(req, res, next) {
    var eventId = mongoose.Types.ObjectId(req.body.eventId),
        userId = req.body.userId,
        type = req.body.type;
    var createVote = Q.nbind(Vote.create, Vote); 
    createVote({
        eventId: eventId,
        userId: userId,
        type: type
    })
    .then(function(vote) {
      console.log("Created Vote");
      res.sendStatus(201);
    })
    .fail(function(err) {
      console.log("error on vote creation", err);
      return;
    });
  }
};
