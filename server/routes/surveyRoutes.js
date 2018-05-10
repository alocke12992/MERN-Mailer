const _ = require('lodash');
const Path = require('path-parser').default;
// URL is a default module in node to help parse urls
const {URL} = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middleWares/requireLogin');
const requireCredits = require('../middleWares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = app => {
  app.get('/api/surveys', requireLogin, async (req, res) => {
    const surveys = await Survey.find({_user: req.user.id}).select({
      recipients: false,
    });

    res.send(surveys);
  });

  // Redirect user after they vote
  app.get('/api/surveys/:surveyId/:choice', (req, res) => {
    res.send('Thanks for voting!');
  });

  app.post('/api/surveys/webhooks', (req, res) => {
    const p = new Path('/api/surveys/:surveyId/:choice');

    _.chain(req.body)
      .map(({email, url}) => {
        const match = p.test(new URL(url).pathname);
        if (match) {
          return {email, surveyId: match.surveyId, choice: match.choice};
        }
      })
      // Remove undefined element - return only event obj
      .compact()
      // Remove duplicate records
      .uniqBy('email', 'surveyId')
      .each(({surveyId, email, choice}) => {
        Survey.updateOne({
          _id: surveyId,
          recipients: {
            $elemMatch: {email: email, responded: false},
          },
        }, {
            $inc: {[choice]: 1},
            // Set one of the properties found as responded
            $set: {'recipients.$.responded': true},
            lastResponded: new Date()
            // .exec() runs the query
          }).exec()
      })
      .value();
    res.send({});
  });

  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    const {title, subject, body, recipients} = req.body;

    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(',').map(email => ({email: email.trim()})),
      _user: req.user.id,
      dateSent: Date.now(),
    });

    // Great place to send an email!
    const mailer = new Mailer(survey, surveyTemplate(survey));

    try {
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();

      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });
};
