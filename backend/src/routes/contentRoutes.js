/**
 * Content Routes
 * Slim route definitions — validation → controller only.
 * Replaces the old generate.js and refine.js routes.
 */

const express = require('express');
const router = express.Router();
const validate = require('../middleware/validateRequest');
const { generateContent, refineContent } = require('../controllers/contentController');

// POST /api/v1/content/generate
router.post('/content/generate', validate('generateContent'), generateContent);

// POST /api/v1/content/refine
router.post('/content/refine', validate('refineContent'), refineContent);

module.exports = router;
