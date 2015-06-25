var request = require('supertest');
var express = require('express');
var expect = require('chai').expect;
var app = require('../../server/server.js');

var db = require('mongoose');
var Event = require('../../server/events/eventModel');
var User = require('../../server/users/userModel');

describe('/api/events', function () {

  it('Expect 201 when POST to /api/events', function (done) {
    var req = request(app);

    req.post('/api/events') 
      .send({ 
        'description': 'Ashwins Famous Party',
        'coordinates': [127.5, 32.1],
        'userId': '555'
      })
      .expect(201)
      .end(done)
  });

  it('Check the event that was POSTed', function (done) {
    Event.findOne({ 'description' : 'Ashwins Famous Party'})
    .exec(function (err, event) {
      expect(event.user).to.equal('555');
      done();
    });
  });

});
