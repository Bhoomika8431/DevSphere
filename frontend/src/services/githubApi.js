// src/services/githubApi.js

export const analyzeRepository = async (repoUrl) => {
  const response = await fetch('http://localhost:5000/api/github/analyze', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ url: repoUrl }),
  });

  const text = await response.text();
  let data;
  
  try {
    data = text ? JSON.parse(text) : {};
  } catch (err) {
    console.error('Server non-JSON response:', text);
    throw new Error('Server returned an invalid response format.');
  }

  if (!response.ok) {
    throw new Error(data.message || 'Unable to fetch repository details from GitHub.');
  }

  return data;
};

export const fetchGitHubRepository = analyzeRepository;