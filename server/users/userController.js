var User = require('./userModel');
var Q = require('q');

module.exports = {
  /*
    login() is used when the Server receives a POST request at /api/user
    After login via Facebook authentication,
    create a new user entry
  */
  login: function (req, res, next) {

    var findOne = Q.nbind(User.findOne, User);

    findOne({_id: req.body._id})
      .then(function (user) {
        if (user) {
          res.sendStatus(200);
        } else {
          var createUser = Q.nbind(User.create, User);
          return createUser(req.body).then(function (user) {
            res.sendStatus(201);
          });
        }
      })
      .fail(function (error) {
        next(error);
      });
  }
};
