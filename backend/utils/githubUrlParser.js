/**
 * Validates and extracts owner and repository name from a GitHub URL.
 */
const parseGitHubUrl = (inputUrl) => {
  if (!inputUrl || typeof inputUrl !== 'string') {
    return { isValid: false, error: 'Please enter a valid GitHub repository URL.' };
  }

  const trimmed = inputUrl.trim();

  try {
    const parsed = new URL(trimmed);

    if (parsed.hostname !== 'github.com' && parsed.hostname !== 'www.github.com') {
      return { isValid: false, error: 'Please enter a valid GitHub repository URL.' };
    }

    const pathSegments = parsed.pathname.split('/').filter(Boolean);

    if (pathSegments.length < 2) {
      return { isValid: false, error: 'Please enter a complete GitHub repository URL including owner and project.' };
    }

    const owner = pathSegments[0];
    const repo = pathSegments[1].replace(/\.git$/, '');

    return {
      isValid: true,
      owner,
      repo,
      cleanUrl: `https://github.com/${owner}/${repo}`,
    };
  } catch (err) {
    return { isValid: false, error: 'Please enter a valid GitHub repository URL.' };
  }
};

module.exports = { parseGitHubUrl };