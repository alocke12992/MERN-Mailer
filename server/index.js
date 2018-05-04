//using common JS modules b/c NodeJS does not provide support for ES6 imports
const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
require('./services/passport');
require('./models/User');

mongoose.connect(keys.mongoURI);

const app = express();
require('./routes/authRoutes')(app);

// Set up dynamic port to prep for Heroku deploy
const PORT = process.env.PORT || 5000;
app.listen(PORT);
