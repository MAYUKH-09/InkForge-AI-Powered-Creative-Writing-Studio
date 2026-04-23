/**
 * Error Handler Middleware
 * Structured error responses with request ID correlation.
 */

const logger = require('../utils/logger');

function errorHandler(err, req, res, next) {
  const requestId = req.id || 'unknown';

  logger.error(`[${requestId}] ${err.message}`);
  if (process.env.NODE_ENV !== 'production') {
    logger.debug(`[${requestId}] Stack:`, err.stack);
  }

  // OpenAI specific errors
  if (err.status === 401 || err.code === 'invalid_api_key') {
    return res.status(401).json({
      success: false,
      error: 'Invalid API Key',
      message: 'The OpenAI API key is invalid or expired. Please check your .env configuration.',
      code: 'INVALID_API_KEY',
      requestId,
    });
  }

  if (err.status === 429) {
    return res.status(429).json({
      success: false,
      error: 'Rate Limit Exceeded',
      message: 'Too many requests to the AI service. Please wait a moment and try again.',
      code: 'RATE_LIMIT',
      requestId,
    });
  }

  if (err.status === 500 || err.code === 'server_error') {
    return res.status(500).json({
      success: false,
      error: 'AI Service Error',
      message: 'The AI service encountered an error. Please try again.',
      code: 'AI_SERVICE_ERROR',
      requestId,
    });
  }

  // General errors
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal Server Error',
    message: 'Something went wrong. Please try again.',
    code: 'INTERNAL_ERROR',
    requestId,
  });
}

module.exports = errorHandler;
