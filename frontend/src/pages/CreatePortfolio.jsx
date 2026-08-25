// src/pages/CreatePortfolio.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { analyzeRepository } from '../services/githubApi';
import { savePortfolio } from '../services/portfolioApi';

export default function CreatePortfolio() {
  const [urlInput, setUrlInput] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [analysisData, setAnalysisData] = useState(null);

  const navigate = useNavigate();

  const validateUrl = (input) => {
    if (!input || !input.trim()) {
      return 'Please enter a valid GitHub repository URL.';
    }

    try {
      const parsed = new URL(input.trim());
      if (parsed.hostname !== 'github.com' && parsed.hostname !== 'www.github.com') {
        return 'Please enter a valid GitHub repository URL.';
      }

      const pathSegments = parsed.pathname.split('/').filter(Boolean);
      if (pathSegments.length < 2) {
        return 'Please enter a complete GitHub repository URL including owner and project name.';
      }

      return null;
    } catch (err) {
      return 'Please enter a valid GitHub repository URL.';
    }
  };

  const handleAnalyze = async (e) => {
    e.preventDefault();
    setError(null);
    setAnalysisData(null);

    const validationError = validateUrl(urlInput);
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    try {
      const result = await analyzeRepository(urlInput.trim());
      setAnalysisData(result);
    } catch (err) {
      setError(err.message || 'Something went wrong while analyzing the project. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSavePortfolio = async () => {
    if (!analysisData) return;
    setSaving(true);
    setError(null);

    try {
      const payload = {
        title: analysisData.project.name,
        description: analysisData.project.description,
        githubUrl: urlInput.trim(),
        projectData: analysisData,
      };

      // Save to MongoDB and get returned object with _id
      const saved = await savePortfolio(payload);

      // Redirect to live portfolio view using the newly created ID
      navigate(`/portfolio/${saved._id}`);
    } catch (err) {
      setError(err.message || 'Failed to publish portfolio. Please check your backend connection.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto text-white py-8 space-y-8">
      {/* Title Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          Create Your Developer Portfolio
        </h1>
        <p className="text-slate-400 text-sm sm:text-base">
          Add your GitHub projects and let DevSphere transform them into professional portfolio content.
        </p>
      </div>

      {/* Input Form */}
      <form
        onSubmit={handleAnalyze}
        className="bg-slate-800/50 border border-slate-700/60 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl"
      >
        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-2">
            Enter GitHub Project URL
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="https://github.com/username/project"
              value={urlInput}
              onChange={(e) => {
                setUrlInput(e.target.value);
                if (error) setError(null);
              }}
              className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 px-6 py-3 rounded-xl font-semibold text-white shadow-lg shadow-indigo-600/30 cursor-pointer transition whitespace-nowrap"
            >
              {loading ? 'Analyzing...' : 'Analyze Project'}
            </button>
          </div>
        </div>

        {/* Error Warning Box */}
        {error && (
          <div className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-400 text-sm font-medium">
            ⚠️ {error}
          </div>
        )}
      </form>

      {/* Loading Indicator */}
      {loading && (
        <div className="bg-slate-800/40 border border-slate-700/60 rounded-3xl p-8 text-center space-y-4 shadow-xl animate-pulse">
          <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-slate-300 font-medium text-sm">Analyzing GitHub Repository...</p>
        </div>
      )}

      {/* Results & Publish Button */}
      {!loading && analysisData && (
        <div className="space-y-6">
          {/* Analysis Details */}
          <div className="bg-slate-800/60 border border-slate-700/60 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <img
                  src={analysisData.project.ownerAvatar}
                  alt={analysisData.project.owner}
                  className="w-14 h-14 rounded-2xl border-2 border-indigo-500/40"
                />
                <div>
                  <h2 className="text-2xl font-bold text-white">{analysisData.project.name}</h2>
                  <p className="text-sm text-slate-400">by @{analysisData.project.owner}</p>
                </div>
              </div>
              <a
                href={analysisData.project.htmlUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-400 hover:text-indigo-300 text-sm font-medium"
              >
                View on GitHub ↗
              </a>
            </div>

            <p className="text-slate-300 text-sm border-t border-slate-700/40 pt-4">
              {analysisData.project.description}
            </p>

            {/* Stats Overview */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
              <div className="bg-slate-900/60 p-3 rounded-xl text-center">
                <span className="text-xs text-slate-400 block">Stars</span>
                <span className="text-lg font-bold text-amber-400">{analysisData.stats.stars}</span>
              </div>
              <div className="bg-slate-900/60 p-3 rounded-xl text-center">
                <span className="text-xs text-slate-400 block">Forks</span>
                <span className="text-lg font-bold text-cyan-400">{analysisData.stats.forks}</span>
              </div>
              <div className="bg-slate-900/60 p-3 rounded-xl text-center">
                <span className="text-xs text-slate-400 block">Watchers</span>
                <span className="text-lg font-bold text-purple-400">{analysisData.stats.watchers}</span>
              </div>
              <div className="bg-slate-900/60 p-3 rounded-xl text-center">
                <span className="text-xs text-slate-400 block">Open Issues</span>
                <span className="text-lg font-bold text-rose-400">{analysisData.stats.openIssues}</span>
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="flex justify-end pt-2">
            <button
              onClick={handleSavePortfolio}
              disabled={saving}
              className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold px-8 py-3.5 rounded-xl shadow-lg shadow-emerald-600/20 cursor-pointer transition"
            >
              {saving ? 'Publishing...' : 'Publish Live Portfolio ✨'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}