import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPortfolios = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/portfolios');
      if (response.ok) {
        const data = await response.json();
        setPortfolios(data);
      } else {
        throw new Error('Failed to fetch');
      }
    } catch (error) {
      setPortfolios([
        {
          id: '1',
          title: 'DevSphere Portfolio Showcase',
          repo: 'https://github.com/Bhoomika8431/DevSphere',
          status: 'Published',
          updatedAt: new Date().toISOString().split('T')[0],
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolios();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this portfolio?')) return;

    try {
      await fetch(`http://localhost:5000/api/portfolios/${id}`, { method: 'DELETE' });
      setPortfolios((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      setPortfolios((prev) => prev.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 text-white">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Your Portfolios</h1>
          <p className="text-slate-400 mt-1">Manage, edit, and publish your generated portfolio websites.</p>
        </div>
        <button
          type="button"
          onClick={() => navigate('/create-portfolio')}
          className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-5 py-2.5 rounded-xl transition shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>+</span> Create New Portfolio
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12 text-slate-400">Loading portfolios...</div>
      ) : portfolios.length === 0 ? (
        <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-12 text-center space-y-4">
          <h3 className="text-xl font-semibold">No Portfolios Found</h3>
          <p className="text-slate-400 max-w-md mx-auto">
            You haven't generated any portfolios yet. Connect a GitHub repository to get started.
          </p>
          <button
            type="button"
            onClick={() => navigate('/create-portfolio')}
            className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-xl text-sm font-medium transition cursor-pointer"
          >
            Create Your First Portfolio
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolios.map((portfolio) => (
            <div
              key={portfolio.id}
              className="bg-slate-800/50 border border-slate-700/60 hover:border-indigo-500/50 rounded-2xl p-6 flex flex-col justify-between transition group shadow-md"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {portfolio.status || 'Published'}
                  </span>
                  <span className="text-xs text-slate-400">{portfolio.updatedAt}</span>
                </div>
                <h2 className="text-xl font-bold text-white group-hover:text-indigo-400 transition">
                  {portfolio.title}
                </h2>
                <a
                  href={portfolio.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-slate-400 hover:text-slate-200 truncate block"
                >
                  {portfolio.repo}
                </a>
              </div>

              <div className="flex items-center justify-between pt-6 mt-6 border-t border-slate-700/50">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => navigate(`/portfolio/${portfolio.id}`)}
                    className="text-sm text-emerald-400 hover:text-emerald-300 font-medium cursor-pointer"
                  >
                    View Live ↗
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate(`/edit/${portfolio.id}`)}
                    className="text-sm text-indigo-400 hover:text-indigo-300 font-medium cursor-pointer"
                  >
                    Edit
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => handleDelete(portfolio.id)}
                  className="text-sm text-rose-400 hover:text-rose-300 font-medium cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}