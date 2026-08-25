import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function PublicPortfolio() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/portfolios/${id}`);
        if (response.ok) {
          const data = await response.json();
          setPortfolio(data);
        }
      } catch (err) {
        console.error('Error fetching portfolio:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, [id]);

  if (loading) {
    return <div className="text-center py-20 text-slate-400">Loading full portfolio details...</div>;
  }

  if (!portfolio) {
    return (
      <div className="text-center py-20 text-white space-y-4">
        <h2 className="text-2xl font-bold">Portfolio Not Found</h2>
        <button onClick={() => navigate('/dashboard')} className="text-indigo-400 underline">
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto text-white py-8 space-y-8">
      {/* Top Bar Navigation */}
      <div className="flex justify-between items-center border-b border-slate-800 pb-4">
        <button
          type="button"
          onClick={() => navigate('/dashboard')}
          className="text-sm text-indigo-400 hover:text-indigo-300 font-medium cursor-pointer"
        >
          ← Back to Dashboard
        </button>
        <span className="text-xs text-slate-400 uppercase tracking-widest font-semibold">
          Complete Showcase
        </span>
      </div>

      {/* Main Hero Header */}
      <div className="bg-gradient-to-br from-slate-800/90 to-slate-900 border border-slate-700/60 rounded-3xl p-8 sm:p-10 space-y-6 shadow-2xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold uppercase tracking-wider">
            Repository Overview
          </span>
          <a
            href={portfolio.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-4 py-2 rounded-xl text-sm transition shadow-lg shadow-indigo-600/30 cursor-pointer"
          >
            View Source on GitHub ↗
          </a>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
          {portfolio.title}
        </h1>

        <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
          {portfolio.bio}
        </p>

        {/* Repository Metric Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-700/50">
          <div className="bg-slate-900/60 border border-slate-700/60 rounded-xl p-3 text-center">
            <div className="text-xs text-slate-400 font-medium">Stars</div>
            <div className="text-lg font-bold text-amber-400 mt-0.5">⭐ {portfolio.stars ?? 0}</div>
          </div>
          <div className="bg-slate-900/60 border border-slate-700/60 rounded-xl p-3 text-center">
            <div className="text-xs text-slate-400 font-medium">Forks</div>
            <div className="text-lg font-bold text-cyan-400 mt-0.5">🍴 {portfolio.forks ?? 0}</div>
          </div>
          <div className="bg-slate-900/60 border border-slate-700/60 rounded-xl p-3 text-center">
            <div className="text-xs text-slate-400 font-medium">Open Issues</div>
            <div className="text-lg font-bold text-rose-400 mt-0.5">⚠️ {portfolio.openIssues ?? 0}</div>
          </div>
          <div className="bg-slate-900/60 border border-slate-700/60 rounded-xl p-3 text-center">
            <div className="text-xs text-slate-400 font-medium">License</div>
            <div className="text-lg font-bold text-emerald-400 mt-0.5">📜 {portfolio.license || 'MIT'}</div>
          </div>
        </div>

        {/* Full Technologies Used */}
        <div className="space-y-3 pt-2">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Languages & Technologies
          </h3>
          <div className="flex flex-wrap gap-2">
            {portfolio.techStack.map((tech, idx) => (
              <span
                key={idx}
                className="px-3.5 py-1.5 bg-slate-800 border border-slate-700 text-indigo-300 rounded-xl text-xs font-semibold"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Full Project Documentation / README View */}
      <div className="bg-slate-800/40 border border-slate-700/60 rounded-3xl p-8 space-y-4">
        <h2 className="text-xl font-bold border-b border-slate-700/60 pb-3">
          📖 Project Documentation (README)
        </h2>
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 overflow-x-auto text-slate-300 font-mono text-sm leading-relaxed whitespace-pre-wrap">
          {portfolio.readmeContent}
        </div>
      </div>
    </div>
  );
}