// backend/controllers/githubController.js
const { fetchRepoData } = require('../services/githubService');

const analyzeRepo = async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) {
      return res.status(400).json({ message: 'GitHub URL is required.' });
    }

    const repoData = await fetchRepoData(url);
    return res.status(200).json(repoData);
  } catch (error) {
    console.error('❌ GitHub Controller Error:', error.message);
    return res.status(500).json({
      message: error.message || 'Unable to fetch repository details from GitHub.',
    });
  }
};

// 🔴 CRITICAL: Ensure analyzeRepo is exported in an object
module.exports = {
  analyzeRepo,
};