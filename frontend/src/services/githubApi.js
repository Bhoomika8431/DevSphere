const API_BASE_URL = 'http://localhost:5000/api';

export const analyzeRepository = async (repositoryUrl) => {
  try {
    const response = await fetch(`${API_BASE_URL}/github/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ repositoryUrl }),
    });

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error(`Server returned non-JSON response (${response.status}). Check if Express backend is running on port 5000.`);
    }

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || 'Failed to analyze repository.');
    }

    return data.data;
  } catch (err) {
    if (err.message.includes('Failed to fetch')) {
      throw new Error('Unable to connect to backend server. Make sure http://localhost:5000 is running.');
    }
    throw err;
  }
};