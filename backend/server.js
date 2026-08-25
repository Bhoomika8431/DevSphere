const express = require('express');
const cors = require('cors');
const portfolioRoutes = require('./routes/portfolioRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/portfolios', portfolioRoutes);

app.listen(PORT, () => {
  console.log(`DevSphere backend server running on http://localhost:${PORT}`);
});