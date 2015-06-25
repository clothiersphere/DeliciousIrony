var bodyParser = require('body-parser');

module.exports = function (app, express) {

  var userRouter = express.Router();
  var eventRouter = express.Router();
  var voteRouter = express.Router();

  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(express.static(__dirname + '/../../public/client/'));

  app.use('/api/user', userRouter);
  app.use('/api/events', eventRouter);
  app.use('/api/votes', voteRouter);
  require('../users/userRoutes.js')(userRouter);
  require('../events/eventRoutes.js')(eventRouter);
  require('../votes/voteRoutes.js')(voteRouter);

};
