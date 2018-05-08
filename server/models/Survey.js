const mongoose = require('mongoose');
const { Schema } = mongoose;

const surveySchema = new Schema({
  title: String,
  body: String,
  subject: String,
  //Specifies that we want an array of strings
  recipients: [String],
});

mongoose.model('surveys', surveySchema);
