/**
 * Health Routes
 * System health check and status endpoints.
 */

const express = require('express');
const router = express.Router();
const ai = require('../../../ai');

router.get('/health', (req, res) => {
  const providerInfo = ai.getProviderInfo();

  res.json({
    status: 'ok',
    version: '2.0.0',
    mode: providerInfo.mode,
    provider: providerInfo.name,
    model: providerInfo.model,
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;
