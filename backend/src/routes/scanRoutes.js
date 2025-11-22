const express = require('express');
const router = express.Router();
const { analyzeScan, getScanHistory } = require('../controllers/scanController');
const authMiddleware = require('../Middleware/authMiddleware'); 


/**
 * SCAN ROUTES
 * All routes require authentication (authMiddleware)
 * 
 * POST   /api/scans/analyze    - Scan code for vulnerabilities
 * GET    /api/scans/history    - Get all user's scans
 */

// All scan routes require authentication
router.use(authMiddleware);

// Scan code endpoint
router.post('/analyze', analyzeScan);

// Get scan history endpoint
router.get('/history', getScanHistory);

module.exports = router;