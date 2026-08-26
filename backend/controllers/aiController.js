// backend/controllers/aiController.js

const generateDescription = async (req, res) => {
  try {
    const { name, description, owner, topics, languages, stars, forks, readmeContent } = req.body;

    const apiKey = process.env.AI_API_KEY;
    if (!apiKey) {
      console.error('❌ AI Error: Missing AI_API_KEY in backend/.env');
      return res.status(500).json({
        success: false,
        message: 'Unable to generate the project description. Please check your .env file.',
      });
    }

    const promptText = `
You are a technical resume and developer portfolio specialist. Write a concise, professional project description suitable for a developer portfolio.

PROJECT METADATA:
- Name: ${name || 'N/A'}
- Existing Description: ${description || 'None provided'}
- Owner: ${owner || 'N/A'}
- Topics: ${Array.isArray(topics) ? topics.join(', ') : 'None'}
- Languages: ${
      Array.isArray(languages)
        ? languages.map((l) => (typeof l === 'object' ? l.name : l)).join(', ')
        : 'N/A'
    }
- Stars: ${stars || 0}, Forks: ${forks || 0}
- README Snippet: ${readmeContent ? readmeContent.substring(0, 800) : 'None'}

REQUIREMENTS:
1. Length: 80 to 150 words.
2. Tone: Professional, clear, technically accurate, recruiter-ready.
3. Content: Explain what the project does, key features, technology stack, and practical value.
4. Formatting: Output clean, plain text paragraphs (no markdown headers, no emojis).
`;

    // Fetch using Gemini API
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey.trim()}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: promptText }],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    if (!response.ok || !data.candidates?.[0]?.content?.parts?.[0]?.text) {
      console.error('❌ Gemini API Error Response:', JSON.stringify(data, null, 2));
      return res.status(500).json({
        success: false,
        message: 'Unable to generate the project description. Please try again.',
      });
    }

    const aiText = data.candidates[0].content.parts[0].text.trim();
    console.log('✅ AI Description successfully generated!');

    return res.status(200).json({
      success: true,
      description: aiText,
    });
  } catch (error) {
    console.error('❌ Backend Server AI Exception:', error);
    return res.status(500).json({
      success: false,
      message: 'Unable to generate the project description. Please try again.',
    });
  }
};

module.exports = { generateDescription };