const { fetchGitHubRepository } = require('../services/githubService');

const analyzeRepository = async (req, res) => {
  try {
    const { repositoryUrl } = req.body;

    if (!repositoryUrl) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid GitHub repository URL.',
      });
    }

    const data = await fetchGitHubRepository(repositoryUrl);

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    const statusCode = error.status || 500;
    return res.status(statusCode).json({
      success: false,
      message: error.message || 'Something went wrong while analyzing the project. Please try again.',
    });
  }
};

module.exports = { analyzeRepository };