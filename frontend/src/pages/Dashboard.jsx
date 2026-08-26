// src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPortfolios, deletePortfolio } from '../services/portfolioApi';

export default function Dashboard() {
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPortfolios = async () => {
    try {
      const response = await getPortfolios();
      const data = response.data || response;
      setPortfolios(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching portfolios:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolios();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deletePortfolio(id);
      setPortfolios((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error('Failed to delete portfolio:', err);
    }
  };

  if (loading) {
    return <div className="text-center py-12 text-slate-400">Loading your portfolios...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Your Portfolios</h1>
          <p className="text-slate-400 text-sm">Manage and view your published developer portfolios.</p>
        </div>
        <Link
          to="/create"
          className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-4 py-2 rounded-xl transition text-sm"
        >
          + Create New Portfolio
        </Link>
      </div>

      {portfolios.length === 0 ? (
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-12 text-center space-y-4">
          <p className="text-slate-400">You haven't created any portfolios yet.</p>
          <Link
            to="/create"
            className="inline-block bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-5 py-2.5 rounded-xl transition text-sm"
          >
            Create First Portfolio
          </Link>
        </div>
      ) : (
        <div className="grid gap-6">
          {portfolios.map((item) => {
            const title = item.title || item.project?.name || 'Untitled Project';
            const owner = item.owner || item.project?.owner || 'Developer';
            const description = item.aiDescription || item.project?.description || 'No description provided.';
            const languages = item.languages || item.project?.languages || [];
            const stats = item.stats || {
              stars: item.project?.stargazers_count || 0,
              forks: item.project?.forks_count || 0,
              watchers: item.project?.watchers_count || 0,
              openIssues: item.project?.open_issues_count || 0,
            };

            return (
              <div
                key={item.id}
                className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-6 space-y-4"
              >
                {/* Header */}
                <div>
                  <h2 className="text-xl font-bold text-white">{title}</h2>
                  <p className="text-slate-400 text-sm">by @{owner}</p>
                </div>

                {/* AI Description */}
                <p className="text-slate-300 text-sm leading-relaxed line-clamp-3">{description}</p>

                {/* 🏷️ Technologies Used Badges */}
                {languages.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {languages.map((tech, idx) => (
                      <span
                        key={idx}
                        className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-medium px-2.5 py-1 rounded-lg"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                {/* 📊 Repository Stats Grid */}
                <div className="grid grid-cols-4 gap-2 pt-2 text-center">
                  <div className="bg-slate-900/40 border border-slate-700/40 rounded-xl p-2">
                    <div className="text-xs text-amber-400 font-semibold">⭐ Stars</div>
                    <div className="text-sm font-bold text-white">{stats.stars}</div>
                  </div>
                  <div className="bg-slate-900/40 border border-slate-700/40 rounded-xl p-2">
                    <div className="text-xs text-sky-400 font-semibold">🍴 Forks</div>
                    <div className="text-sm font-bold text-white">{stats.forks}</div>
                  </div>
                  <div className="bg-slate-900/40 border border-slate-700/40 rounded-xl p-2">
                    <div className="text-xs text-emerald-400 font-semibold">👁️ Watchers</div>
                    <div className="text-sm font-bold text-white">{stats.watchers}</div>
                  </div>
                  <div className="bg-slate-900/40 border border-slate-700/40 rounded-xl p-2">
                    <div className="text-xs text-rose-400 font-semibold">⚠️ Issues</div>
                    <div className="text-sm font-bold text-white">{stats.openIssues}</div>
                  </div>
                </div>

                <hr className="border-slate-700/50" />

                {/* Action Buttons */}
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 font-semibold px-4 py-2 rounded-xl text-xs transition flex items-center gap-1.5"
                  >
                    🗑️ Delete
                  </button>

                  <div className="flex gap-2">
                    <Link
                      to={`/edit/${item.id}`}
                      className="bg-slate-700 hover:bg-slate-600 text-slate-200 font-semibold px-4 py-2 rounded-xl text-xs transition"
                    >
                      Edit
                    </Link>
                    <Link
                      to={`/portfolio/${item.id}`}
                      className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs transition flex items-center gap-1"
                    >
                      View Live ↗
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}