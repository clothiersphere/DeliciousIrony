var userCtrl = require('./userController.js');

module.exports = function(app){
  app.route('/')
    .post(userCtrl.login);
};
