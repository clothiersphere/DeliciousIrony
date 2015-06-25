var Vote = require('./voteModel');
var Event = require('./../events/eventModel');
var mongoose = require('mongoose');
var Q = require('q');

module.exports = {
  extract: function (req, res, next) {
    /*
      extract() is used when the Server receives a GET request at /api/votes
      Finding all Vote Documents that have a 'event_created_at' value
      greater than 12 hours ago from the current time.
    */

    var lastTime = new Date();
    lastTime.setHours(lastTime.getHours() - 12);

    var findVotes = Q.nbind(Vote.find, Vote);
    findVotes({ 'event_created_at': { $gt : lastTime }})
    .then(function (votes) {
      console.log('Votes Successfully Extracted');
      res.json({ votes: votes });
    })
    .fail(function (error) {
      console.log('Vote Extraction Failed');
      next(error);
    });

  },

  add: function (req, res, next) {
    /*
      add() is used when the Server receives a POST request at /api/votes

      This will add a new Vote Document to the 'votes' Collection.
      The _id of the new Vote Document is pushed into the corresponding Event Document's 
      'votes'
    */

    var eventId = mongoose.Types.ObjectId(req.body.eventId),
        userId = req.body.userId,
        type = req.body.type;

    var createVote = Q.nbind(Vote.create, Vote);
    createVote({
        eventId: eventId,
        userId: userId,
        type: type
      })
    .then(function (vote) {
        Event.findOne({ '_id' : vote.eventId })
      .exec(function (err, event) {
          var now = new Date();
          if (!vote.created_at) {
            vote.created_at = now;
          }
          vote.event_created_at = event.created_at;
          vote.save(function (err, voteSaved) {
            console.log('Created Vote');
            event.votes.push(voteSaved._id);
            event.save(function (err, eventSaved) {
              console.log('Push VoteID into the event');
              res.sendStatus(201);
            });
          });
        });
      })
    .fail(function (err) {
        console.log('Error on Vote Creation', err);
        return;
      });
  }
};
