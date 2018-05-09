//using common JS modules b/c NodeJS does not provide support for ES6 imports
const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
// So I can view my routes
const pathfinderUI = require('pathfinder-ui');

require('./models/User');
require('./models/Survey');
require('./services/passport');

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI);

const app = express();

//Use Body Parser since, by default, Express does not parse the request payload.
app.use(bodyParser.json());
app.use(
  cookieSession({
    // Set timeout for 30 days
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  }),
);
app.use(passport.initialize());
//create passport session for user
app.use(passport.session());
app.use(
  '/pathfinder',
  function(req, res, next) {
    pathfinderUI(app);
    next();
  },
  pathfinderUI.router,
);

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

// Handle production build routes for Heroku
if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets
  app.use(express.static('client/build'));

  //express will serve index.html if it doesnt recognize the route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(_dirname, 'client', 'build', 'index.html'));
  });
}

// Set up dynamic port to prep for Heroku deploy
const PORT = process.env.PORT || 5000;
app.listen(PORT);
