import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layout & Pages
import Layout from './layouts/Layout';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import CreatePortfolio from './pages/CreatePortfolio';
import EditPortfolio from './pages/EditPortfolio';
import LivePortfolio from './pages/LivePortfolio'; // 👈 1. Added LivePortfolio import

export default function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="create-portfolio" element={<CreatePortfolio />} />
          <Route path="edit/:id" element={<EditPortfolio />} />
          
          {/* 👈 2. Fixed single portfolio route pointing to LivePortfolio */}
          <Route path="portfolio/:id" element={<LivePortfolio />} />
          
          {/* Catch-all route for unknown paths */}
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </Router>
  );
}