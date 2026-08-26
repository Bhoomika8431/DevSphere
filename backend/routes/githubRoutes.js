// backend/routes/githubRoutes.js
const express = require('express');
const router = express.Router();
// 🔴 CRITICAL: Destructure analyzeRepo so it isn't undefined
const { analyzeRepo } = require('../controllers/githubController');

// Define route
router.post('/analyze', analyzeRepo);

module.exports = router;