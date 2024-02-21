const whatsappRoutes = require('./lib/routes');

const initByConfiguration = async (configuration, app) => {
  try {
    app.use('/whatsapp-api', whatsappRoutes);
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  initByConfiguration,
};
