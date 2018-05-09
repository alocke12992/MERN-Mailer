const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/keys');
//Using SendGrid despite this crazy syntax because it is free to get started
class Mailer extends helper.Mail {
  //content is the surveyTemplate we got from the SurveyRoute
  constructor({ subject, recipients }, content) {
    super();

    this.sgApi = sendgrid(keys.sendGridKey);
    this.from_email = new helper.Email('no-reply@mern-mailer.com');
    this.subject = subject;
    this.body = new helper.Content('text/html', content);
    this.recipients = this.formatAddresses(recipients);
    //A send Grid helper function to add content with the body
    this.addContent(this.body);
    //Enable 'Click-tracking' via sendgrid
    this.addClickTracking();
    // Takes formatted list of emails and adds to email
    this.addRecipients();
  }
  //Extract each of the recipients addresses
  formatAddresses(recipients) {
    return recipients.map(({ email }) => {
      return new helper.Email(email);
    });
  }

  addClickTracking() {
    const trackingSettings = new helper.TrackingSettings();
    const clickTracking = new helper.ClickTracking(true, true);

    trackingSettings.setClickTracking(clickTracking);
    this.addTrackingSettings(trackingSettings);
  }

  addRecipients() {
    const personalize = new helper.Personalization();

    this.recipients.forEach(recipient => {
      personalize.addTo(recipient);
    });
    this.addPersonalization(personalize);
  }

  async send() {
    const request = this.sgApi.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: this.toJSON(),
    });

    const response = await this.sgApi.API(request);
    return response;
  }
}

module.exports = Mailer;
