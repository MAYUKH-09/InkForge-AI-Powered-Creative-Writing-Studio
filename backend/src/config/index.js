/**
 * Centralized Configuration
 * All environment variable reads happen here.
 * Exports a frozen config object — no raw process.env elsewhere.
 */

const config = {
  port: parseInt(process.env.PORT, 10) || 3001,

  cors: {
    origins: (process.env.CORS_ORIGINS || 'http://localhost:5173,http://localhost:3000').split(','),
    methods: ['GET', 'POST'],
    credentials: true,
  },

  ai: {
    apiKey: process.env.GOOGLE_GENAI_API_KEY || process.env.GEMINI_API_KEY || '',
    model: process.env.GEMINI_MODEL || 'gemini-2.5-flash',
  },

  server: {
    bodyLimit: process.env.BODY_LIMIT || '5mb',
    env: process.env.NODE_ENV || 'development',
  },
};

// Freeze to prevent accidental mutation
Object.freeze(config);
Object.freeze(config.cors);
Object.freeze(config.ai);
Object.freeze(config.server);

module.exports = config;
