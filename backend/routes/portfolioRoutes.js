const express = require('express');
const router = express.Router();
const {
  createPortfolio,
  getPortfolioById,
  getAllPortfolios,
  deletePortfolio, // 👈 Import delete
} = require('../controllers/portfolioController');

router.post('/', createPortfolio);
router.get('/', getAllPortfolios);
router.get('/:id', getPortfolioById);
router.delete('/:id', deletePortfolio); // 👈 Register DELETE route

module.exports = router;