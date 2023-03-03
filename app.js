(async () => {
  try {
    const { startServer } = require('./server');
    await startServer();
  } catch (error) {
    console.error(error);
  }
})();
