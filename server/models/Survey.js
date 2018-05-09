const mongoose = require('mongoose');
const { Schema } = mongoose;
const RecipientSchema = require('./Recipient');

const surveySchema = new Schema({
  title: String,
  body: String,
  subject: String,
  //Specifies that we want an array of strings
  recipients: [RecipientSchema],
  // Record the total number of times recipients have selected the option
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0 },
  // use _ to show this is a reference field
  _user: { type: Schema.Types.ObjectId, ref: 'User' },
  dateSent: Date,
  lastResponded: Date,
});

mongoose.model('surveys', surveySchema);
