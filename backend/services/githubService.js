const { parseGitHubUrl } = require('../utils/githubUrlParser');

const fetchGitHubRepository = async (repositoryUrl) => {
  const parsed = parseGitHubUrl(repositoryUrl);

  if (!parsed.isValid) {
    const error = new Error(parsed.error);
    error.status = 400;
    throw error;
  }

  const { owner, repo } = parsed;
  const token = process.env.GITHUB_TOKEN;

  const headers = {
    'User-Agent': 'DevSphere-App',
    Accept: 'application/vnd.github.v3+json',
  };

  if (token) {
    headers.Authorization = `token ${token}`;
  }

  try {
    // 1. Fetch Repository Metadata
    const repoRes = await fetch(`https://api.github.com/repos/${owner}/${repo}`, { headers });

    if (repoRes.status === 404) {
      const error = new Error('Repository not found or private. Please provide a public GitHub repository.');
      error.status = 404;
      throw error;
    }

    if (repoRes.status === 403) {
      const error = new Error('GitHub API rate limit reached. Please try again later.');
      error.status = 429;
      throw error;
    }

    if (!repoRes.ok) {
      const error = new Error('Unable to fetch repository details from GitHub.');
      error.status = repoRes.status;
      throw error;
    }

    const repoData = await repoRes.json();

    // 2. Fetch Languages Breakdown
    let languagesData = {};
    const langRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/languages`, { headers });
    if (langRes.ok) {
      languagesData = await langRes.json();
    }

    // 3. Process Language Percentages
    const totalBytes = Object.values(languagesData).reduce((acc, bytes) => acc + bytes, 0);
    const languages = Object.entries(languagesData).map(([name, bytes]) => {
      const percentage = totalBytes > 0 ? ((bytes / totalBytes) * 100).toFixed(1) : '0.0';
      return {
        name,
        bytes,
        percentage: parseFloat(percentage),
      };
    }).sort((a, b) => b.bytes - a.bytes);

    // 4. Return Structured Data
    return {
      project: {
        name: repoData.name,
        fullName: repoData.full_name,
        owner: repoData.owner.login,
        ownerAvatar: repoData.owner.avatar_url,
        description: repoData.description || 'No description available for this repository.',
        htmlUrl: repoData.html_url,
        homepage: repoData.homepage || null,
        topics: repoData.topics || [],
        defaultBranch: repoData.default_branch,
        visibility: repoData.visibility || (repoData.private ? 'private' : 'public'),
        license: repoData.license ? repoData.license.spdx_id || repoData.license.name : 'Not specified',
        size: repoData.size,
      },
      stats: {
        stars: repoData.stargazers_count,
        forks: repoData.forks_count,
        watchers: repoData.subscribers_count || repoData.watchers_count,
        openIssues: repoData.open_issues_count,
      },
      dates: {
        created: repoData.created_at,
        updated: repoData.updated_at,
        pushed: repoData.pushed_at,
      },
      flags: {
        isArchived: repoData.archived,
        isFork: repoData.fork,
      },
      technologies: languages,
    };
  } catch (err) {
    if (err.status) throw err;
    const networkError = new Error('Unable to connect to GitHub. Please check your network and try again.');
    networkError.status = 503;
    throw networkError;
  }
};

module.exports = { fetchGitHubRepository };