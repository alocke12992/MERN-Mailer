//using common JS modules b/c NodeJS does not provide support for ES6 imports
const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20')
  .Strategy;
const keys = require('./config/keys');
const app = express();

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      console.log('access token:', accessToken);
      console.log('refresh token:', refreshToken);
      console.log('profile', profile);
    },
  ),
);

app.get(
  '/auth/google',
  passport.authenticate('google', {
    // Specify what we are asking the user to allow us access
    scope: ['profile', 'email'],
  }),
);

app.get(
  '/auth/google/callback',
  passport.authenticate('google'),
);

// Set up dynamic port to prep for Heroku deploy
const PORT = process.env.PORT || 5000;
app.listen(PORT);
