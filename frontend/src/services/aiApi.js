// src/services/aiApi.js
const API_BASE_URL = 'http://localhost:5000/api';

export const generateAiDescription = async (repoPayload) => {
  const response = await fetch(`${API_BASE_URL}/api/ai/generate-description`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: repoPayload.project?.name,
      description: repoPayload.project?.description,
      owner: repoPayload.project?.owner,
      topics: repoPayload.project?.topics || [],
      languages: repoPayload.technologies || [],
      stars: repoPayload.stats?.stars,
      forks: repoPayload.stats?.forks,
      readmeContent: repoPayload.readmeContent || '',
    }),
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || 'Unable to generate the project description. Please try again.');
  }

  return data.description;
};