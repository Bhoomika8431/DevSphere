import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import layout and page components
import Layout from './layouts/Layout';
import Dashboard from './pages/Dashboard';
import CreatePortfolio from './pages/CreatePortfolio';
import EditPortfolio from './pages/EditPortfolio';

export default function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="create-portfolio" element={<CreatePortfolio />} />
          <Route path="edit/:id" element={<EditPortfolio />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}