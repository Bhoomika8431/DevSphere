import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
        <nav className="border-b border-slate-800 bg-slate-900/80 px-6 py-4 flex justify-between items-center backdrop-blur">
          <Link to="/" className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            DevSphere
          </Link>
          <div className="flex gap-4">
            <Link to="/dashboard" className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-sm font-medium transition text-white">
              Dashboard
            </Link>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
