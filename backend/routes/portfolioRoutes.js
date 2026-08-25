const express = require('express');
const router = express.Router();

// Mock database store
let portfolios = [
  {
    id: '1',
    title: 'Full Stack Engineer Portfolio',
    repo: 'https://github.com/octocat/Hello-World',
    status: 'Published',
    updatedAt: '2026-08-24',
  },
];

// GET all portfolios
router.get('/', (req, res) => {
  res.status(200).json(portfolios);
});

// POST create portfolio
router.post('/', (req, res) => {
  const { repoUrl } = req.body;
  const newPortfolio = {
    id: String(portfolios.length + 1),
    title: repoUrl ? repoUrl.split('/').pop() + ' Portfolio' : 'New Portfolio',
    repo: repoUrl || 'https://github.com/user/repo',
    status: 'Published',
    updatedAt: new Date().toISOString().split('T')[0],
  };

  portfolios.push(newPortfolio);
  res.status(201).json(newPortfolio);
});

module.router = router;
module.exports = router;