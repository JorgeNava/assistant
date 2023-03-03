require('dotenv').config();
const express = require('express');
const twilio = require('twilio');
const bodyParser = require('body-parser');

const accountSid = process.env.TWILIO_ACC_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
//const client = twilio(accountSid, authToken);

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/whatsapp', (req, res) => {
  const twiml = new twilio.twiml.MessagingResponse();

  const messageBody = req.body.Body;
  console.log('Received message:', messageBody);

  // Process the incoming message as needed...

  twiml.message('Thanks for your message!');

  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end(twiml.toString());
});

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Express server listening on port ${server.address().port}`);
});
