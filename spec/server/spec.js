var request = require('supertest');
var express = require('express');
var expect = require('chai').expect;
var app = require('../../server/server.js');

var db = require('mongoose');
var Event = require('../../server/events/eventModel');
var User = require('../../server/users/userModel');

var req = request(app);

User.remove({ '_id': { $in: [
  '555',
  '123'
]}})
  .exec();

describe('/api/user', function () {
    

  it('POST New Users', function (done) {
    req.post('/api/user')
      .send({
        '_id': '123',
        'first_name': 'Ashwin',
        'last_name': 'Da man',
        'email': 'ash@win.com'
      })
      .expect(201);

    req.post('/api/user')
      .send({
        '_id': '555',
        'first_name': 'David',
        'last_name': 'Fella',
        'email': 'wowza@415.com'
      })
      .expect(2101)
      .end(done);
  });
});


describe('/api/events', function () {

  it('Expect 201 when POST to /api/events', function (done) {

    req.post('/api/events')
      .send({
        'description': 'Ashwins Famous Party',
        'coordinates': [127.5, 32.1],
        'userId': '555'
      })
      .expect(201)
      .end(done);
  });

  it('Check the event that was POSTed', function (done) {
    Event.findOne({ 'description' : 'Ashwins Famous Party'})
    .exec(function (err, event) {
      expect(event.user).to.equal('555');
      done();
    });
  });

});
