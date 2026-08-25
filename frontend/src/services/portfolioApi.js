const API_BASE_URL = 'http://localhost:5000/api';

// Create / Save new portfolio
export const savePortfolio = async (portfolioData) => {
  const response = await fetch(`${API_BASE_URL}/portfolios`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(portfolioData),
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || 'Failed to save portfolio.');
  }

  return data.data;
};

// Fetch all portfolios
export const fetchAllPortfolios = async () => {
  const response = await fetch(`${API_BASE_URL}/portfolios`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch portfolios.');
  }

  if (Array.isArray(data.data)) {
    return data.data;
  } else if (Array.isArray(data)) {
    return data;
  }

  return [];
};

// Fetch single portfolio by ID
export const fetchPortfolioById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/portfolios/${id}`);
  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || 'Failed to fetch portfolio.');
  }

  return data.data;
};

// Delete portfolio by ID
export const deletePortfolioById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/portfolios/${id}`, {
    method: 'DELETE',
  });
  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || 'Failed to delete portfolio.');
  }

  return data;
};