import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchAllPortfolios, deletePortfolioById } from '../services/portfolioApi';

export default function Dashboard() {
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadPortfolios();
  }, []);

  const loadPortfolios = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAllPortfolios();
      setPortfolios(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || 'Failed to load portfolios.');
      setPortfolios([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) {
      return;
    }

    try {
      await deletePortfolioById(id);
      // Remove deleted item locally from state immediately
      setPortfolios((prev) => prev.filter((item) => (item._id || item.id) !== id));
    } catch (err) {
      alert(err.message || 'Could not delete portfolio.');
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-8 text-white space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Your Portfolios</h1>
          <p className="text-slate-400 text-sm">Manage and view your published developer portfolios.</p>
        </div>
        <Link
          to="/create-portfolio"
          className="bg-indigo-600 hover:bg-indigo-500 font-semibold text-sm px-4 py-2.5 rounded-xl transition"
        >
          + Create New Portfolio
        </Link>
      </div>

      {loading ? (
        <div className="text-slate-400 text-center py-12">Loading portfolios...</div>
      ) : error ? (
        <div className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-400 text-sm">
          ⚠️ {error}
        </div>
      ) : portfolios.length === 0 ? (
        <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-12 text-center space-y-4">
          <p className="text-slate-400">You haven't created any portfolios yet.</p>
          <Link
            to="/create-portfolio"
            className="inline-block bg-indigo-600 text-white px-5 py-2 rounded-xl text-sm font-semibold"
          >
            Create First Portfolio
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {portfolios.map((item) => {
            const itemId = item._id || item.id;
            return (
              <div
                key={itemId}
                className="bg-slate-800/50 border border-slate-700/60 rounded-2xl p-6 space-y-4 flex flex-col justify-between hover:border-slate-600 transition"
              >
                <div>
                  <h3 className="text-xl font-bold text-white">{item.title}</h3>
                  <p className="text-slate-400 text-sm line-clamp-2 mt-1">{item.description}</p>
                </div>

                <div className="flex items-center justify-between border-t border-slate-700/40 pt-4">
                  <button
                    onClick={() => handleDelete(itemId, item.title)}
                    className="bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer"
                  >
                    🗑️ Delete
                  </button>

                  <div className="flex gap-2">
                    <Link
                      to={`/edit/${itemId}`}
                      className="bg-slate-700 hover:bg-slate-600 text-white text-xs px-3 py-1.5 rounded-lg transition"
                    >
                      Edit
                    </Link>
                    <Link
                      to={`/portfolio/${itemId}`}
                      className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs px-3 py-1.5 rounded-lg transition"
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