//using common JS modules b/c NodeJS does not provide support for ES6 imports
const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20')
  .Strategy;
const app = express();

passport.use(new GoogleStrategy());

// Set up dynamic port to prep for Heroku deploy
const PORT = process.env.PORT || 5000;
app.listen(PORT);
