const express = require('express');
const router = express.Router();
const { analyzeRepository } = require('../controllers/githubController');

// This matches POST http://localhost:5000/api/github/analyze
router.post('/analyze', analyzeRepository);

module.exports = router;