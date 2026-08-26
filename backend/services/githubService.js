// backend/services/githubService.js
const axios = require('axios');

/**
 * Fetches repository metadata and README contents from GitHub API
 */
const fetchRepoData = async (repoUrl) => {
  try {
    // Clean URL to extract owner and repo name
    const cleanUrl = repoUrl.trim().replace(/\/$/, '');
    const urlParts = cleanUrl.split('/');
    const repoName = urlParts.pop();
    const owner = urlParts.pop();

    if (!owner || !repoName) {
      throw new Error('Invalid GitHub repository URL format. Use: https://github.com/owner/repo');
    }

    const headers = {};
    // Optional: Add GitHub token if configured to prevent rate limits
    if (process.env.GITHUB_TOKEN) {
      headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`;
    }

    // 1. Fetch main repo details
    const repoResponse = await axios.get(`https://api.github.com/repos/${owner}/${repoName}`, { headers });
    const project = repoResponse.data;

    // 2. Try fetching languages breakdown
    let languages = {};
    try {
      const langResponse = await axios.get(`https://api.github.com/repos/${owner}/${repoName}/languages`, { headers });
      languages = langResponse.data;
    } catch (e) {
      console.warn('⚠️ Could not fetch languages breakdown:', e.message);
    }

    // 3. Try fetching README content
    let readmeContent = '';
    try {
      const readmeResponse = await axios.get(`https://api.github.com/repos/${owner}/${repoName}/readme`, {
        headers: { ...headers, Accept: 'application/vnd.github.v3.raw' },
      });
      readmeContent = typeof readmeResponse.data === 'string' ? readmeResponse.data : JSON.stringify(readmeResponse.data);
    } catch (e) {
      console.warn('⚠️ No README found or failed to fetch README:', e.message);
    }

    return {
      project,
      languages,
      readmeContent: readmeContent.slice(0, 5000), // Trim for AI context limit
      title: project.name,
      owner: project.owner?.login || owner,
      repoUrl: project.html_url,
    };
  } catch (error) {
    console.error('❌ GitHub Service Error:', error.response?.data?.message || error.message);
    throw new Error(error.response?.data?.message || 'Failed to communicate with GitHub API.');
  }
};

module.exports = {
  fetchRepoData,
};