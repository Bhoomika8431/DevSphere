const express = require('express');
const cors = require('cors');
require('dotenv').config();

// 1. Import your route files
const githubRoutes = require('./routes/githubRoutes');
const portfolioRoutes = require('./routes/portfolioRoutes'); // 👈 ADD THIS LINE

const app = express();

app.use(cors());
app.use(express.json());

// 2. Mount API Routes
app.use('/api/github', githubRoutes);
app.use('/api/portfolios', portfolioRoutes); // 👈 ADD THIS LINE

// 3. Fallback 404 handler (this generated the message in your screenshot!)
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found on backend.`,
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`DevSphere backend server running on http://localhost:${PORT}`);
});