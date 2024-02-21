const express = require('express');

const whatsappRoutes = express.Router({ mergeParams: true });

const { whatsappController } = require('../controller');

whatsappRoutes.get('healthcheck', (req, res) => {
  const verify_token = process.env.WHATSAPP_VERIFY_TOKEN;
  console.log('whatsapp working');
  res.status(200);
});
whatsappRoutes.get('webhook', whatsappController.verifyWebhook);
whatsappRoutes.post('webhook', whatsappController.receiveMessage);

module.exports = whatsappRoutes;
