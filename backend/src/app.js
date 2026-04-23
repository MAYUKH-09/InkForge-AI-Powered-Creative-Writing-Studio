/**
 * Express Application Setup
 * Clean, slim configuration — delegates to route index.
 */

const express = require('express');
const cors = require('cors');
const config = require('./config');
const routes = require('./routes');
const requestLogger = require('./middleware/requestLogger');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// ─── Global Middleware ──────────────────────────────────────────────────────
app.use(cors({
  origin: config.cors.origins,
  methods: config.cors.methods,
  credentials: config.cors.credentials,
}));
app.use(express.json({ limit: config.server.bodyLimit }));
app.use(requestLogger);

// ─── Routes ─────────────────────────────────────────────────────────────────
app.use(routes);

// ─── Error Handling ─────────────────────────────────────────────────────────
app.use(errorHandler);

module.exports = app;
