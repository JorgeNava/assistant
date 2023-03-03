'use strict';
require('dotenv').config();

/**
 * UPDATE TEMPORARY WEBHOOK URL (ON PROD WON'T BE NECESSARY)
 * UPDATE TEMPORARY ACCESS TOKEN (GET PERMANENT TOKEN: https://developers.facebook.com/docs/whatsapp/business-management-api/get-started#1--acquire-an-access-token-using-a-system-user-or-facebook-login)
 *
 * Use IBM's Watson API to get intents
 * Use chatgpy to answer and get queries
 */

const token = process.env.WHATSAPP_TOKEN;

const request = require('request'),
  express = require('express'),
  body_parser = require('body-parser'),
  axios = require('axios').default,
  app = express().use(body_parser.json());

const PORT = process.env.PORT || 1337;
app.listen(PORT, () => console.log('webhook is listening on port ' + PORT));

app.post('/webhook', async (req, res) => {
  let body = req.body;

  console.log(JSON.stringify(req.body, null, 2));

  try {
    if (req.body.object) {
      if (
        req.body.entry &&
        req.body.entry[0].changes &&
        req.body.entry[0].changes[0] &&
        req.body.entry[0].changes[0].value.messages &&
        req.body.entry[0].changes[0].value.messages[0]
      ) {
        let phone_number_id =
          req.body.entry[0].changes[0].value.metadata.phone_number_id;
        let from = req.body.entry[0].changes[0].value.messages[0].from;
        let msg_body = req.body.entry[0].changes[0].value.messages[0].text.body;

        const url =
          'https://graph.facebook.com/v16.0/' +
          phone_number_id +
          '/messages?access_token=' +
          token;
        const RECIPIENT_PHONE = process.env.WHATSAPP_RECIPIENT_PHONE;

        await axios({
          method: 'POST',
          url: url,
          data: {
            messaging_product: 'whatsapp',
            to: RECIPIENT_PHONE,
            text: { body: 'Ack: ' + msg_body },
          },
          headers: { 'Content-Type': 'application/json' },
        });
      }
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error(error);
    console.error(error.response.data.error);
  }
});

app.get('/webhook', (req, res) => {
  /**
   * UPDATE YOUR VERIFY TOKEN
   *This will be the Verify Token value when you set up webhook
   **/
  const verify_token = process.env.WHATSAPP_VERIFY_TOKEN;
  console.log('[NAVA] req.query :', req.query);

  let mode = req.query['hub.mode'];
  let token = req.query['hub.verify_token'];
  let challenge = req.query['hub.challenge'];

  if (mode && token) {
    if (mode === 'subscribe' && token === verify_token) {
      console.log('WEBHOOK_VERIFIED');
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
  }
});
