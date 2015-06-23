var User = require('./userModel');

module.exports = {
  signup: function(req, res, next){
    var dummy = User({ // dummy user
      fb_id: 'fb_id',
      username: 'username',
      first_name: 'first',
      last_name: 'last',
      email: 'abc@abc'
    });

    User.findOne({fb_id: dummy.fb_id})
      .exec(function(err, user){
        if(err) console.log(err);
        if(user){
          res.send(200);
        } else {
          User.create(dummy, function(err, user){
            console.log(dummy.fb_id, 'successfully created');
          });
          res.send(201);
        }
      });

    res.json('hello world');
  },

  login: function(req, res, next){
    var dummy = User({ // dummy user
      fb_id: 'fb_id',
      username: 'username',
      first_name: 'first',
      last_name: 'last',
      email: 'abc@abc'
    });

    User.findOne({fb_id: dummy.fb_id})
      .exec(function(err, user){
        if(err) console.log(err);
        if(user){
          res.send(200);
        } else {
          User.create(dummy, function(err, user){
            console.log(dummy.fb_id, 'successfully created');
          });
          res.send(201);
        }
      });

    res.json('hello world');
  }
};
