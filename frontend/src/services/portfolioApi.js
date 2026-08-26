// src/services/portfolioApi.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/portfolio';

/**
 * 1. Analyze a GitHub repository URL and generate an AI summary
 */
export const analyzeRepository = async (repoUrl) => {
  // 📌 Updated endpoint to match backend route (/analyze-repo)
  const response = await axios.post(`${API_BASE_URL}/analyze-repo`, { repoUrl });
  return response.data;
};

/**
 * 2. Fetch all published portfolio items for the Dashboard
 */
export const getPortfolios = async () => {
  const response = await axios.get(API_BASE_URL);
  return response.data;
};

/**
 * 3. Fetch a single portfolio item by ID
 */
export const getPortfolioById = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/${id}`);
  return response.data;
};

/**
 * Alias export to satisfy components importing 'fetchPortfolioById'
 */
export const fetchPortfolioById = getPortfolioById;

/**
 * 4. Save / Publish a new portfolio item
 */
export const savePortfolio = async (portfolioData) => {
  const response = await axios.post(API_BASE_URL, portfolioData);
  return response.data;
};

/**
 * 5. Delete a portfolio item by ID
 */
export const deletePortfolio = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/${id}`);
  return response.data;
};

export default {
  analyzeRepository,
  getPortfolios,
  getPortfolioById,
  fetchPortfolioById,
  savePortfolio,
  deletePortfolio,
};