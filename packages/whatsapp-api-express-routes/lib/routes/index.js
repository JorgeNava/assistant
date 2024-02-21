const express = require('express');

const whatsappRoutes = express.Router({ mergeParams: true });

const { whatsappController } = require('../controller');

whatsappRoutes.get('/healthcheck', (req, res) => {
  console.log('Whatsapp endpoints working');
  res.sendStatus(200);
});
whatsappRoutes.get('/webhook', whatsappController.verifyWebhook);
whatsappRoutes.post('/webhook', whatsappController.receiveMessage);

module.exports = whatsappRoutes;
