const express = require("express");
const router = express.Router();
const { getUserPortfolios, createPortfolio } = require("../controllers/portfolioController");

router.get("/", getUserPortfolios);
router.post("/", createPortfolio);

module.exports = router;
