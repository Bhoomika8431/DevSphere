// backend/controllers/portfolioController.js

let portfolios = []; // Or your Mongoose model logic

const createPortfolio = async (req, res) => {
  try {
    const { title, description, githubUrl, projectData } = req.body;
    const newPortfolio = {
      _id: Date.now().toString(),
      title: title || projectData?.project?.name || 'Untitled',
      description: description || projectData?.project?.description || '',
      githubUrl,
      projectData,
      createdAt: new Date(),
    };
    portfolios.push(newPortfolio);
    return res.status(201).json({ success: true, data: newPortfolio });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to create portfolio.' });
  }
};

const getPortfolioById = async (req, res) => {
  try {
    const { id } = req.params;
    const portfolio = portfolios.find((p) => p._id === id);
    if (!portfolio) {
      return res.status(404).json({ success: false, message: 'Portfolio Not Found' });
    }
    return res.status(200).json({ success: true, data: portfolio });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to retrieve portfolio.' });
  }
};

const getAllPortfolios = async (req, res) => {
  return res.status(200).json({ success: true, data: portfolios });
};

// 👈 MAKE SURE THIS FUNCTION EXISTS
const deletePortfolio = async (req, res) => {
  try {
    const { id } = req.params;
    const index = portfolios.findIndex((p) => p._id === id);

    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Portfolio Not Found' });
    }

    portfolios.splice(index, 1);
    return res.status(200).json({ success: true, message: 'Portfolio deleted successfully.' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to delete portfolio.' });
  }
};

// 👈 MAKE SURE deletePortfolio IS IN THIS EXPORT OBJECT!
module.exports = {
  createPortfolio,
  getPortfolioById,
  getAllPortfolios,
  deletePortfolio,
};