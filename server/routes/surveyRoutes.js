const mongoose = require('mongoose');
const requireLogin = require('../middleWares/requireLogin');
const requireCredits = require('../middleWares/requireCredits');

//Create instance of Survey
const Survey = mongoose.model('surveys');

module.exports = app => {
  app.post(
    '/api/surveys',
    requireLogin,
    requireCredits,
    (req, res) => {
      const { title, subject, body, recipients } = req.body;
      const survey = new Survey({
        title,
        subject,
        body,
        recipients: recipients
          .split(',')
          .map(email => ({ email: email.trim() })),
        _user: req.user.id,
        dateSent: Date.now(),
      });
    },
  );
};
