//using common JS modules b/c NodeJS does not provide support for ES6 imports
const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
const pathfinderUI = require('pathfinder-ui');

require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  }),
);
app.use(passport.initialize());
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

// Set up dynamic port to prep for Heroku deploy
const PORT = process.env.PORT || 5000;
app.listen(PORT);
