const verifyWebhook = (req, res) => {
  console.log('[NAVA] inside verifyWebhook');
  const verify_token = process.env.VERIFY_TOKEN;
  
  let mode = req?.query['hub.mode'];
  let token = req?.query['hub.verify_token'];
  let challenge = req?.query['hub.challenge'];

  console.log('[NAVA] verify_token', verify_token);
  
  if (mode && token) {
    if (mode === 'subscribe' && token === verify_token) {
      console.log('WEBHOOK_VERIFIED');
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
  }
  res.sendStatus(403);
};

module.exports = {
  verifyWebhook,
};
