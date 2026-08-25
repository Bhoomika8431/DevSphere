const express = require('express');
const router = express.Router();

// Mock initial data store
let portfolios = [
  {
    id: '1',
    title: 'DevSphere Portfolio Showcase',
    repo: 'https://github.com/Bhoomika8431/DevSphere',
    bio: 'AI-driven dynamic portfolio builder for developers.',
    techStack: ['React', 'FastAPI', 'Tailwind CSS', 'Node.js'],
    status: 'Published',
    updatedAt: new Date().toISOString().split('T')[0],
  },
];

// Helper to sanitize GitHub repository URLs
const cleanGitHubUrl = (url) => {
  if (!url) return 'https://github.com/Bhoomika8431/DevSphere';
  return url.replace(/\/blob\/.*$/, '').replace(/\/tree\/.*$/, '').trim();
};

// 1. GET ALL PORTFOLIOS
router.get('/', (req, res) => {
  res.status(200).json(portfolios);
});

// 2. GET SINGLE PORTFOLIO BY ID
router.get('/:id', (req, res) => {
  const item = portfolios.find((p) => p.id === req.params.id);
  if (!item) {
    return res.status(404).json({ message: 'Portfolio not found' });
  }
  res.status(200).json(item);
});

// 3. CREATE NEW PORTFOLIO
router.post('/', (req, res) => {
  const rawUrl = req.body.repoUrl || req.body.repo;
  const sanitizedUrl = cleanGitHubUrl(rawUrl);
  
  // Extract repository name from URL
  const repoName = sanitizedUrl.split('/').filter(Boolean).pop() || 'Project';

  const newPortfolio = {
    id: String(Date.now()),
    title: req.body.title || `${repoName} Portfolio`,
    repo: sanitizedUrl,
    bio: req.body.bio || 'Generated portfolio project showcase.',
    techStack: req.body.techStack || ['React', 'FastAPI', 'Tailwind CSS'],
    status: 'Published',
    updatedAt: new Date().toISOString().split('T')[0],
  };

  portfolios.push(newPortfolio);
  res.status(201).json(newPortfolio);
});

// 4. UPDATE PORTFOLIO
router.put('/:id', (req, res) => {
  const index = portfolios.findIndex((p) => p.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: 'Portfolio not found' });
  }

  const updatedRepo = req.body.repoUrl || req.body.repo;

  portfolios[index] = {
    ...portfolios[index],
    ...req.body,
    repo: updatedRepo ? cleanGitHubUrl(updatedRepo) : portfolios[index].repo,
    updatedAt: new Date().toISOString().split('T')[0],
  };

  res.status(200).json(portfolios[index]);
});

// 5. DELETE PORTFOLIO
router.delete('/:id', (req, res) => {
  const initialLength = portfolios.length;
  portfolios = portfolios.filter((p) => p.id !== req.params.id);

  if (portfolios.length === initialLength) {
    return res.status(404).json({ message: 'Portfolio not found' });
  }

  res.status(200).json({ message: 'Portfolio deleted successfully' });
});

module.exports = router;