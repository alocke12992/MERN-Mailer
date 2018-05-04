const passport = require('passport');

module.exports = app => {
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

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};
