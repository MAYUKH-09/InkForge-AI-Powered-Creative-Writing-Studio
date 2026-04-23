/**
 * Request Logger Middleware
 * Logs every incoming request with method, path, status, and duration.
 * Assigns a unique request ID for error correlation.
 */

const crypto = require('crypto');
const logger = require('../utils/logger');

function requestLogger(req, res, next) {
  // Assign unique request ID
  req.id = crypto.randomUUID().substring(0, 8);
  req.startTime = Date.now();

  // Log on response finish
  res.on('finish', () => {
    const duration = Date.now() - req.startTime;
    logger.request(req.method, req.originalUrl, res.statusCode, duration);
  });

  next();
}

module.exports = requestLogger;
