/**
 * InkForge Backend Server — Entry Point
 */

require('dotenv').config();

const app = require('./src/app');
const config = require('./src/config');
const logger = require('./src/utils/logger');
const ai = require('../ai');

const providerInfo = ai.getProviderInfo();

app.listen(config.port, () => {
  console.log('');
  logger.success(`InkForge Backend v2.0 running on http://localhost:${config.port}`);
  logger.info(`AI Provider: ${providerInfo.name} (${providerInfo.mode} mode)`);
  logger.info(`Model: ${providerInfo.model}`);
  logger.info(`Environment: ${config.server.env}`);
  logger.info(`API: /api/v1/ (legacy /api/ also supported)`);
  console.log('');
});
