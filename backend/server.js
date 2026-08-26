// backend/server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Import routes
const githubRoutes = require('./routes/githubRoutes');
const portfolioRoutes = require('./routes/portfolioRoutes');
const aiRoutes = require('./routes/aiRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// API Route Mounts (Ensured singular /api/portfolio)
app.use('/api/github', githubRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/ai', aiRoutes);

// Fallback 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found on backend.`,
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` DevSphere backend server running on http://localhost:${PORT}`);
});