const express = require('express');

const whatsappRoutes = express.Router({ mergeParams: true });

const { whatsappController } = require('../controller');

whatsappRoutes.get('whatsapp/webhook', whatsappController.verifyWebhook);
whatsappRoutes.post('whatsapp/webhook', whatsappController.receiveMessage);

module.exports = whatsappRoutes;
