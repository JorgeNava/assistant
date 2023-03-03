const MODULE_ID = 'whatsapp-api-express-routes-controller-receive-message';

const ramda = require('ramda');
const lodash = require('lodash');
const axios = require('axios');

const receiveMessage = async (req, res) => {
  let body = req.body;
  const token = process.env.WHATSAPP_TOKEN;

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
};

module.exports = {
  receiveMessage,
};
