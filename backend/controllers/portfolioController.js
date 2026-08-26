// backend/controllers/portfolioController.js
require('dotenv').config();
const { fetchRepoData } = require('../services/githubService');
const { GoogleGenAI } = require('@google/genai');

// Explicitly target GEMINI_API_KEY
const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

let portfoliosStorage = [];

const getAllPortfolios = async (req, res) => {
  try {
    return res.json({ success: true, data: portfoliosStorage });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to fetch portfolios.' });
  }
};

const getPortfolioById = async (req, res) => {
  try {
    const { id } = req.params;
    const item = portfoliosStorage.find((p) => p.id === id);
    if (!item) return res.status(404).json({ success: false, message: 'Portfolio not found.' });
    return res.json({ success: true, data: item });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Portfolio not found.' });
  }
};

const savePortfolio = async (req, res) => {
  try {
    const portfolioData = req.body;
    const newPortfolio = {
      id: Date.now().toString(),
      title: portfolioData.title || portfolioData.project?.name || 'Untitled Project',
      owner: portfolioData.owner || portfolioData.project?.owner || 'Developer',
      aiDescription: portfolioData.aiDescription || portfolioData.project?.description || '',
      repoUrl: portfolioData.repoUrl || portfolioData.project?.html_url || '',
      project: portfolioData.project || {},
      stats: portfolioData.stats || {
        stars: portfolioData.project?.stargazers_count || 0,
        forks: portfolioData.project?.forks_count || 0,
        watchers: portfolioData.project?.watchers_count || 0,
        openIssues: portfolioData.project?.open_issues_count || 0,
      },
      technologies: portfolioData.technologies || portfolioData.languages || [],
      details: portfolioData.details || {
        defaultBranch: portfolioData.project?.default_branch || 'main',
        license: portfolioData.project?.license?.spdx_id || portfolioData.project?.license?.name || 'None',
        size: portfolioData.project?.size || 0,
      },
      topics: portfolioData.topics || portfolioData.project?.topics || [],
      createdAt: new Date().toISOString(),
    };

    portfoliosStorage.unshift(newPortfolio);
    return res.status(201).json({ success: true, data: newPortfolio });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to save portfolio.' });
  }
};

const generateAiSummary = async (req, res) => {
  try {
    const { repoUrl } = req.body;
    if (!repoUrl) return res.status(400).json({ success: false, message: 'Repository URL is required.' });

    let repoData;
    try {
      repoData = await fetchRepoData(repoUrl);
    } catch (githubError) {
      return res.status(400).json({ success: false, message: `Could not analyze repository: ${githubError.message}` });
    }

    let generatedText = repoData?.project?.description || 'A software repository analyzed with DevSphere.';

    if (apiKey) {
      try {
        const contentToSummarize = repoData.readmeContent || repoData.project?.description || repoData?.project?.name;
        
        const response = await ai.models.generateContent({
          model: 'gemini-3.6-flash', // Updated to current available model
          contents: `Summarize this GitHub repository in 2-3 engaging professional sentences highlighting its technical purpose:\n\n${contentToSummarize}`,
        });

        const extractedText = response?.text || response?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (extractedText) {
          generatedText = extractedText.trim();
        }
      } catch (aiError) {
        console.error('❌ Gemini AI Generation Error Details:', aiError.response?.data || aiError.message);
      }
    } else {
      console.warn('⚠️ GEMINI_API_KEY is missing from environment variables.');
    }

    return res.json({ success: true, data: { ...repoData, aiDescription: generatedText } });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const deletePortfolio = async (req, res) => {
  try {
    const { id } = req.params;
    portfoliosStorage = portfoliosStorage.filter((p) => p.id !== id);
    return res.json({ success: true, message: `Deleted ${id}` });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to delete.' });
  }
};

module.exports = {
  getAllPortfolios,
  getPortfolioById,
  savePortfolio,
  generateAiSummary,
  deletePortfolio,
};