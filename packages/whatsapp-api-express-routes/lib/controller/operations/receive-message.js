const axios = require('axios');
const AWS = require('aws-sdk');
const lambda = new AWS.Lambda();

const receiveMessage = async (req, res) => {
  const token = process.env.WHATSAPP_TOKEN;
  let WHATSAPP_RESPONSE;

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

        console.log('[NAVA] Message Recevied:', {
          from: from,
          message: msg_body,
        });

        const url =
          'https://graph.facebook.com/v16.0/' +
          phone_number_id +
          '/messages?access_token=' +
          token;
        const RECIPIENT_PHONE = process.env.WHATSAPP_RECIPIENT_PHONE;

        /* 
          TODO: DIVIDE THIS SECTION INTO
          1- HANDLING THE RECEIVED MESSAGE AND GET USER INTENT
          2- DETERMINE WHICH CONTROLLER/API TO USE BASED IN INTENT
          3- GIVE CORRESPONDANT RESPONSE TO USER
        */

        let params = {
          FunctionName: 'NL2MongoServerless',
          Payload: JSON.stringify({
            query: msg_body
          }),
        };

        let response = await lambda.invoke(params, (err, data) => {
          if (err) {
            console.error('Error al invocar la función Lambda NL2MongoServerless:', err);
          } else {
            console.log('Respuesta de la función Lambda NL2MongoServerless:', data);
            return data;
          }
        });

        params = {
          FunctionName: 'MongoManager',
          Payload: JSON.stringify(response),
        };

        response = await lambda.invoke(params, (err, data) => {
          if (err) {
            console.error('Error al invocar la función Lambda MongoManager:', err);
          } else {
            console.log('Respuesta de la función Lambda MongoManager:', data);
            return data;
          }
        });

        WHATSAPP_RESPONSE = `[OUTPUT]: ${response ? response : 'An error occurred'}`;

        await axios({
          method: 'POST',
          url: url,
          data: {
            messaging_product: 'whatsapp',
            to: RECIPIENT_PHONE,
            text: { body: WHATSAPP_RESPONSE },
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
  }
};

module.exports = {
  receiveMessage,
};
