require('dotenv').config();
const MODULE_ID = 'assistant-datasource-mongo-provider';

const { MongoClient, ServerApiVersion } = require('mongodb');
const lodash = require('lodash');

const uri = process.env.ASSISTANT_DATASOURCE_PROVIDER_URI;
const dbName = process.env.ASSISTANT_DATASOURCE_PROVIDER_DB_NAME;
let assistantDatasource = {};

const initByConfiguration = async (config) => {
  // TODO: HANDLE VALIDATION OF CONFIG

  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });

  // TODO: HANDLE CONNECTION ERROR CORRECTLY
  await client.connect(function (err) {
    console.log('[NAVA]  :');
    if (err) {
      console.log('[NAVA] err :', err);
      return;
    }
    console.log('Connected successfully to server');
  });

  const db = client.db('Assistant');
  const Z = await db.listCollections().toArray();
  console.log('[NAVA] Z :', Z);
  setAssistantDatasource(db);
};

const setAssistantDatasource = (db) => {
  console.log('[NAVA] setAssistantDatasource db:', db);
  assistantDatasource = {
    executeCommand: async function (commandString) {
      return await db.command(eval(commandString));
    },
  };
};

const getAssistantDatasource = () => {
  return assistantDatasource;
};

module.exports = { initByConfiguration, getAssistantDatasource };
