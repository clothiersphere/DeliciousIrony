var userCtrl = require('./userController.js');

module.exports = function(app){
  app.route('/')
    .get(userCtrl.login)
    .post(userCtrl.signup);

};
