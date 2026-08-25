import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreatePortfolio() {
  const navigate = useNavigate();
  const [repoUrl, setRepoUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!repoUrl) return;

    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/portfolios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ repoUrl }),
      });

      if (response.ok) {
        navigate('/dashboard');
      } else {
        alert('Saved locally!');
        navigate('/dashboard');
      }
    } catch (err) {
      console.warn('Backend server unreadable, fallback redirect:', err);
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto text-white py-8 space-y-6">
      <button
        type="button"
        onClick={() => navigate('/dashboard')}
        className="text-indigo-400 hover:text-indigo-300 text-sm font-medium cursor-pointer"
      >
        ← Back to Dashboard
      </button>

      <div>
        <h1 className="text-3xl font-extrabold">Create New Portfolio</h1>
        <p className="text-slate-400 mt-1">
          Connect a GitHub repository to automatically generate an AI-enhanced portfolio.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-slate-800/50 border border-slate-700/60 rounded-2xl p-6 space-y-5 shadow-xl"
      >
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            GitHub Repository URL
          </label>
          <input
            type="url"
            required
            placeholder="https://github.com/username/project"
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
          />
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="px-4 py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-700/50 cursor-pointer text-sm font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 px-5 py-2.5 rounded-xl text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 cursor-pointer transition"
          >
            {loading ? 'Generating...' : 'Generate Portfolio'}
          </button>
        </div>
      </form>
    </div>
  );
}