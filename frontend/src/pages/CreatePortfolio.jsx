// src/CreatePortfolio.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreatePortfolio() {
  const navigate = useNavigate();
  const [repoUrl, setRepoUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Portfolio created for: ${repoUrl}`);
    navigate('/dashboard');
  };

  return (
    <div className="p-8 max-w-3xl mx-auto text-white space-y-6">
      <button 
        type="button"
        onClick={() => navigate('/dashboard')}
        className="text-indigo-400 hover:text-indigo-300 text-sm font-medium inline-block cursor-pointer mb-2"
      >
        ← Back to Dashboard
      </button>

      <div>
        <h1 className="text-3xl font-bold">Create New Portfolio</h1>
        <p className="text-slate-400 mt-1">
          Connect a GitHub repository to automatically generate an AI-enhanced portfolio.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-slate-800/50 border border-slate-700/60 rounded-2xl p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            GitHub Repository URL
          </label>
          <input
            type="text"
            required
            placeholder="https://github.com/username/project"
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="px-4 py-2 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-700/50 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-500 px-5 py-2 rounded-xl font-medium text-white shadow-lg shadow-indigo-600/30 cursor-pointer"
          >
            Generate Portfolio
          </button>
        </div>
      </form>
    </div>
  );
}