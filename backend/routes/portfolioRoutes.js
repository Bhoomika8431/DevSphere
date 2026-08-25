const express = require('express');
const router = express.Router();

let portfolios = [];

// Helper to parse GitHub URL
const parseGitHubUrl = (url) => {
  if (!url) return null;
  const cleanUrl = url.replace(/\/blob\/.*$/, '').replace(/\/tree\/.*$/, '').trim();
  const parts = cleanUrl.replace('https://github.com/', '').split('/').filter(Boolean);
  if (parts.length >= 2) {
    return { owner: parts[0], repo: parts[1], cleanUrl: `https://github.com/${parts[0]}/${parts[1]}` };
  }
  return null;
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

// 3. CREATE NEW PORTFOLIO (Fetches Metadata + Languages + README content)
router.post('/', async (req, res) => {
  const { repoUrl } = req.body;
  const parsed = parseGitHubUrl(repoUrl);

  let title = 'GitHub Project Portfolio';
  let bio = 'A project generated from GitHub.';
  let techStack = [];
  let stars = 0;
  let forks = 0;
  let openIssues = 0;
  let license = 'MIT';
  let readmeContent = '';
  let repoLink = repoUrl || 'https://github.com/';

  if (parsed) {
    repoLink = parsed.cleanUrl;
    const headers = { 'User-Agent': 'DevSphere-App' };

    try {
      // Endpoint 1: Main Metadata
      const repoRes = await fetch(`https://api.github.com/repos/${parsed.owner}/${parsed.repo}`, { headers });
      if (repoRes.ok) {
        const data = await repoRes.json();
        title = data.name ? `${data.name} Portfolio` : title;
        bio = data.description || bio;
        stars = data.stargazers_count || 0;
        forks = data.forks_count || 0;
        openIssues = data.open_issues_count || 0;
        license = data.license?.spdx_id || 'Not specified';
        if (data.topics && data.topics.length > 0) {
          techStack.push(...data.topics);
        }
      }

      // Endpoint 2: Languages Breakdown
      const langRes = await fetch(`https://api.github.com/repos/${parsed.owner}/${parsed.repo}/languages`, { headers });
      if (langRes.ok) {
        const langData = await langRes.json();
        const languagesDetected = Object.keys(langData);
        techStack = Array.from(new Set([...languagesDetected, ...techStack]));
      }

      // Endpoint 3: README Content
      const readmeRes = await fetch(`https://api.github.com/repos/${parsed.owner}/${parsed.repo}/readme`, { headers });
      if (readmeRes.ok) {
        const readmeData = await readmeRes.json();
        // Decode Base64 content from GitHub
        if (readmeData.content) {
          readmeContent = Buffer.from(readmeData.content, 'base64').toString('utf-8');
        }
      }
    } catch (err) {
      console.warn('Error fetching detailed GitHub data:', err);
    }
  }

  // Fallback tech stack if none detected
  if (techStack.length === 0) {
    techStack = ['JavaScript', 'HTML/CSS'];
  }

  const newPortfolio = {
    id: String(Date.now()),
    title: req.body.title || title,
    repo: repoLink,
    bio: req.body.bio || bio,
    techStack,
    stars,
    forks,
    openIssues,
    license,
    readmeContent: readmeContent || '### Project Overview\nNo README file provided in repository.',
    status: 'Published',
    updatedAt: new Date().toISOString().split('T')[0],
  };

  portfolios.push(newPortfolio);
  res.status(201).json(newPortfolio);
});

// 4. DELETE PORTFOLIO
router.delete('/:id', (req, res) => {
  portfolios = portfolios.filter((p) => p.id !== req.params.id);
  res.status(200).json({ message: 'Deleted' });
});

module.exports = router;