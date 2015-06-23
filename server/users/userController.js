var User = require('./userModel');

module.exports = {
  login: function(req, res, next){
    var data = req.body;

    User.findOne({id: data.id})
      .exec(function(err, user){
        if(err) console.log(err);
        if(user){
          res.sendStatus(200);
        } else {
          User.create(data, function(err, user){
            console.log(user, 'successfully created');
            res.sendStatus(201);
          });
        }
      });
  }
};
