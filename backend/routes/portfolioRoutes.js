// backend/routes/portfolioRoutes.js
const express = require('express');
const router = express.Router();
const portfolioController = require('../controllers/portfolioController');

router.get('/', portfolioController.getAllPortfolios);
router.post('/', portfolioController.savePortfolio);
router.get('/:id', portfolioController.getPortfolioById);
router.post('/analyze-repo', portfolioController.generateAiSummary);
router.delete('/:id', portfolioController.deletePortfolio);

module.exports = router;