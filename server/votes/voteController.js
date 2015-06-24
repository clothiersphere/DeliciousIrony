var Vote = require('./voteModel');
var mongoose = require('mongoose');
var Event = require('./../events/eventModel')
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
      Event.findOne({ "_id" : vote.eventId })
      .exec(function(err,event) {
        var now = new Date();
        if ( !vote.created_at ) {
          vote.created_at = now;
        }
        vote.event_created_at = event.created_at;
        vote.save(function(err, voteSaved) {
          console.log("Created Vote");
          event.votes.push(voteSaved._id);
          event.save(function(err, eventSaved) {
            console.log("Push VoteID into the event");
            console.log(eventSaved);
            res.sendStatus(201);
          })
        });
      });
    })
    .fail(function(err) {
      console.log("error on vote creation", err);
      return;
    });
  }
};
