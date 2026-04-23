/**
 * Route Index — Route Aggregator
 * Mounts all route groups under /api/v1/.
 * Also preserves /api/ legacy endpoints for backward compatibility.
 */

const express = require('express');
const router = express.Router();

const healthRoutes = require('./healthRoutes');
const contentRoutes = require('./contentRoutes');
const exportRoutes = require('./exportRoutes');

// ─── v1 API Routes ──────────────────────────────────────────────────────────
router.use('/api/v1', healthRoutes);
router.use('/api/v1', contentRoutes);
router.use('/api/v1', exportRoutes);

// ─── Legacy Compatibility Layer ─────────────────────────────────────────────
// Maps old /api/ endpoints to new v1 controllers for backward compatibility
const { generateContent, refineContent } = require('../controllers/contentController');
const { exportContent } = require('../controllers/exportController');
const validate = require('../middleware/validateRequest');

router.get('/api/health', (req, res) => {
  // Redirect to v1
  const ai = require('../../../ai');
  const info = ai.getProviderInfo();
  res.json({ status: 'ok', mode: info.mode, timestamp: new Date().toISOString() });
});

router.post('/api/generate-content', validate('generateContent'), generateContent);
router.post('/api/refine-content', validate('refineContent'), refineContent);
router.post('/api/export', validate('exportContent'), exportContent);

module.exports = router;
