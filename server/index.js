//using common JS modules b/c NodeJS does not provide support for ES6 imports
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send({ hi: 'there' });
});
// Set up dynamic port to prep for Heroku deploy
const PORT = process.env.PORT || 5000;
app.listen(PORT);
