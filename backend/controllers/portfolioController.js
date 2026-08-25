const Portfolio = require("../models/Portfolio");

const getUserPortfolios = async (req, res) => {
  try {
    const portfolios = await Portfolio.find({ user: req.user?.id || "650000000000000000000000" });
    res.status(200).json({ success: true, count: portfolios.length, data: portfolios });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createPortfolio = async (req, res) => {
  try {
    const { githubUsername, title, bio, skills, projects, theme } = req.body;
    const newPortfolio = await Portfolio.create({
      user: req.user?.id || "650000000000000000000000",
      githubUsername,
      title: title || `${githubUsername}s Portfolio`,
      bio,
      skills: skills || [],
      projects: projects || [],
      theme: theme || "dark"
    });
    res.status(201).json({ success: true, data: newPortfolio });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getUserPortfolios, createPortfolio };
