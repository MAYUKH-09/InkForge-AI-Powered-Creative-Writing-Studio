/**
 * Export Routes
 * Slim route definition — validation → controller only.
 */

const express = require('express');
const router = express.Router();
const validate = require('../middleware/validateRequest');
const { exportContent } = require('../controllers/exportController');

// POST /api/v1/export
router.post('/export', validate('exportContent'), exportContent);

module.exports = router;
