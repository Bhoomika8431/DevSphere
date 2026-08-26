// src/pages/LivePortfolio.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchPortfolioById } from '../services/portfolioApi';

export default function LivePortfolio() {
  const { id } = useParams();
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPortfolio = async () => {
      try {
        setLoading(true);
        const res = await fetchPortfolioById(id);
        const data = res?.data || res;

        if (!data || Object.keys(data).length === 0) {
          setError('Portfolio not found or empty.');
        } else {
          setPortfolio(data);
        }
      } catch (err) {
        console.error('Error fetching live portfolio:', err);
        setError('Failed to load portfolio details.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadPortfolio();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <div className="text-slate-400 font-medium">Loading portfolio presentation...</div>
      </div>
    );
  }

  if (error || !portfolio) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center space-y-4">
        <div className="text-rose-400 bg-rose-500/10 border border-rose-500/20 px-6 py-4 rounded-xl text-sm">
          ⚠️ {error || 'Portfolio not found.'}
        </div>
        <Link to="/dashboard" className="text-indigo-400 hover:underline text-sm font-medium">
          ← Return to Dashboard
        </Link>
      </div>
    );
  }

  // 📌 1. Build Safe GitHub URL
  const rawRepoUrl = portfolio.repoUrl || portfolio.project?.html_url || '';
  const githubUrl = rawRepoUrl.startsWith('http')
    ? rawRepoUrl
    : rawRepoUrl
    ? `https://${rawRepoUrl}`
    : `https://github.com/${portfolio.owner || portfolio.project?.owner || ''}/${portfolio.title || portfolio.project?.name || ''}`;

  const title = portfolio.title || portfolio.project?.name || 'Untitled Project';
  const owner = portfolio.owner || portfolio.project?.owner || 'Developer';
  const description = portfolio.aiDescription || portfolio.project?.description || 'No description available for this repository.';
  const homepage = portfolio.project?.homepage || portfolio.homepage || null;

  const stats = portfolio.stats || {
    stars: portfolio.project?.stargazers_count || 0,
    forks: portfolio.project?.forks_count || 0,
    watchers: portfolio.project?.watchers_count || 0,
    openIssues: portfolio.project?.open_issues_count || 0,
  };

  // 📌 2. Normalize Languages / Technologies for Progress Bars
  let techList = [];
  const rawTech = portfolio.technologies || portfolio.languages || portfolio.project?.languages || [];

  if (Array.isArray(rawTech)) {
    // If array of objects { name, percentage } or strings
    techList = rawTech.map((item) => {
      if (typeof item === 'string') return { name: item, percentage: (100 / rawTech.length).toFixed(1) };
      return { name: item.name || item.language, percentage: item.percentage || item.percent || 100 };
    });
  } else if (typeof rawTech === 'object' && rawTech !== null) {
    // If raw GitHub language byte count object: { HTML: 5000, Python: 2000 }
    const totalBytes = Object.values(rawTech).reduce((a, b) => a + Number(b), 0) || 1;
    techList = Object.entries(rawTech).map(([name, bytes]) => ({
      name,
      percentage: ((Number(bytes) / totalBytes) * 100).toFixed(1),
    }));
  }

  const details = portfolio.details || {
    defaultBranch: portfolio.project?.default_branch || 'main',
    license: portfolio.project?.license?.spdx_id || portfolio.project?.license?.name || 'None',
    size: portfolio.project?.size || 0,
  };

  const topics = portfolio.topics || portfolio.project?.topics || [];

  // Accent colors for language breakdown bars
  const barColors = ['bg-cyan-400', 'bg-indigo-500', 'bg-purple-500', 'bg-emerald-400', 'bg-amber-400'];

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 py-10 px-4 font-sans">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Navigation Bar */}
        <div className="flex justify-between items-center">
          <Link to="/dashboard" className="text-slate-400 hover:text-white text-sm font-medium transition">
            ← Back to Dashboard
          </Link>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            DevSphere Portfolio
          </span>
        </div>

        {/* Hero Banner */}
        <div className="bg-[#0e1626]/80 border border-slate-800/80 rounded-3xl p-8 space-y-6 shadow-2xl">
          <div className="flex flex-wrap justify-between items-start gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center font-bold text-2xl text-white shadow-lg">
                {title.charAt(0).toUpperCase()}
              </div>
              <div>
                <h1 className="text-3xl font-extrabold text-white tracking-tight">{title}</h1>
                <p className="text-slate-400 text-sm">by @{owner}</p>
              </div>
            </div>

            <div className="flex gap-3">
              {homepage && (
                <a
                  href={homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold px-4 py-2.5 rounded-xl transition border border-slate-700"
                >
                  Live Demo ↗
                </a>
              )}
              {/* 📌 Dynamic GitHub Redirect Link */}
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition shadow-lg shadow-indigo-500/20 flex items-center gap-1.5"
              >
                View on GitHub ↗
              </a>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-400">Project Overview</h3>
            <p className="text-slate-300 leading-relaxed text-sm md:text-base">{description}</p>
          </div>

          {/* Topics */}
          {topics.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Topics</h4>
              <div className="flex flex-wrap gap-2">
                {topics.map((topic, i) => (
                  <span key={i} className="bg-slate-800/80 text-slate-300 text-xs px-3 py-1 rounded-lg border border-slate-700">
                    #{topic}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Statistics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-[#0e1626]/80 border border-slate-800/80 rounded-2xl p-4 text-center">
            <div className="text-xs font-semibold text-amber-400">Stars</div>
            <div className="text-2xl font-bold text-white mt-1">{stats.stars}</div>
          </div>
          <div className="bg-[#0e1626]/80 border border-slate-800/80 rounded-2xl p-4 text-center">
            <div className="text-xs font-semibold text-sky-400">Forks</div>
            <div className="text-2xl font-bold text-white mt-1">{stats.forks}</div>
          </div>
          <div className="bg-[#0e1626]/80 border border-slate-800/80 rounded-2xl p-4 text-center">
            <div className="text-xs font-semibold text-emerald-400">Watchers</div>
            <div className="text-2xl font-bold text-white mt-1">{stats.watchers}</div>
          </div>
          <div className="bg-[#0e1626]/80 border border-slate-800/80 rounded-2xl p-4 text-center">
            <div className="text-xs font-semibold text-rose-400">Open Issues</div>
            <div className="text-2xl font-bold text-white mt-1">{stats.openIssues}</div>
          </div>
        </div>

        {/* Details Section */}
        <div className="grid md:grid-cols-2 gap-6">
          
          {/* 📌 Technologies Used Graph / Progress Bars */}
          <div className="bg-[#0e1626]/80 border border-slate-800/80 rounded-3xl p-6 space-y-6">
            <h3 className="text-lg font-bold text-white">Technologies Used</h3>
            
            {techList.length > 0 ? (
              <div className="space-y-4">
                {techList.map((tech, idx) => {
                  const colorClass = barColors[idx % barColors.length];
                  return (
                    <div key={idx} className="space-y-1.5">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-slate-200">{tech.name}</span>
                        <span className="text-slate-400">{tech.percentage}%</span>
                      </div>
                      <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${colorClass} rounded-full transition-all duration-500`}
                          style={{ width: `${Math.min(100, Math.max(0, tech.percentage))}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-slate-500 text-sm">No specific language breakdown available.</p>
            )}
          </div>

          {/* Repository Details */}
          <div className="bg-[#0e1626]/80 border border-slate-800/80 rounded-3xl p-6 space-y-4">
            <h3 className="text-lg font-bold text-white">Repository Details</h3>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between py-2 border-b border-slate-800/60">
                <span className="text-slate-400">Default Branch</span>
                <span className="text-indigo-400 font-mono text-xs bg-indigo-500/10 px-2.5 py-1 rounded-md border border-indigo-500/20">
                  {details.defaultBranch}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-800/60">
                <span className="text-slate-400">License</span>
                <span className="text-emerald-400 font-semibold">{details.license}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-slate-400">Repository Size</span>
                <span className="text-slate-200 font-semibold">{details.size} KB</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}