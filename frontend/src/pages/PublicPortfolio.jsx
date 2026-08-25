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
        } else {
          throw new Error('Not found');
        }
      } catch (err) {
        setPortfolio({
          id,
          title: 'DevSphere Portfolio Showcase',
          bio: 'AI-driven dynamic portfolio builder for developers.',
          techStack: ['React', 'FastAPI', 'Tailwind CSS', 'Node.js'],
          repo: 'https://github.com/Bhoomika8431/DevSphere',
          updatedAt: new Date().toISOString().split('T')[0],
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, [id]);

  if (loading) {
    return <div className="text-center py-20 text-slate-400">Loading portfolio preview...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto text-white py-10 space-y-12">
      <div className="flex justify-between items-center border-b border-slate-800 pb-4">
        <button
          type="button"
          onClick={() => navigate('/dashboard')}
          className="text-sm text-indigo-400 hover:text-indigo-300 font-medium cursor-pointer"
        >
          ← Back to Dashboard
        </button>
        <span className="text-xs text-slate-400 uppercase tracking-widest font-semibold">
          Live Preview Mode
        </span>
      </div>

      <div className="space-y-6 bg-gradient-to-br from-slate-800/80 to-slate-900 border border-slate-700/60 rounded-3xl p-8 sm:p-12 shadow-2xl">
        <div className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
          Available for Hire / Collaboration
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
          {portfolio.title}
        </h1>

        <p className="text-slate-300 text-lg sm:text-xl leading-relaxed max-w-2xl">
          {portfolio.bio}
        </p>

        <div className="space-y-3 pt-2">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Technologies Used
          </h3>
          <div className="flex flex-wrap gap-2">
            {portfolio.techStack && portfolio.techStack.length > 0 ? (
              portfolio.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 bg-slate-700/60 border border-slate-600/50 rounded-lg text-sm font-medium text-slate-200"
                >
                  {tech}
                </span>
              ))
            ) : (
              <span className="text-slate-400 text-sm">React, Tailwind CSS, JavaScript</span>
            )}
          </div>
        </div>

        <div className="pt-6 flex flex-wrap gap-4 border-t border-slate-700/50">
          <a
            href={portfolio.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-5 py-2.5 rounded-xl transition shadow-lg shadow-indigo-600/30 inline-flex items-center gap-2 cursor-pointer"
          >
            <span>View Source on GitHub</span> ↗
          </a>
        </div>
      </div>
    </div>
  );
}