var eventCtrl = require('./eventController.js');

module.exports = function (app) {
  app.route('/')
    .get(eventCtrl.extract)
    .post(eventCtrl.add);
};
