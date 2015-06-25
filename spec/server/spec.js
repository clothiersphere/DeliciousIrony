var app = require('../../server/server.js');
var request = require('supertest');


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

