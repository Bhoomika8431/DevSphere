import React from 'react';

export default function ProjectAnalysisResult({ data }) {
  if (!data) return null;

  const { project, stats, dates, flags, technologies } = data;

  const formatDate = (isoString) => {
    if (!isoString) return 'N/A';
    return new Date(isoString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* 1. Project Header */}
      <div className="bg-slate-800/60 border border-slate-700/60 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src={project.ownerAvatar}
              alt={project.owner}
              className="w-16 h-16 rounded-2xl border-2 border-indigo-500/40 shadow-md"
            />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-extrabold text-white">{project.name}</h2>
                {flags.isFork && (
                  <span className="px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold">
                    Fork
                  </span>
                )}
                {flags.isArchived && (
                  <span className="px-2 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold">
                    Archived
                  </span>
                )}
              </div>
              <p className="text-sm text-slate-400 font-medium">by <span className="text-indigo-400">@{project.owner}</span></p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {project.homepage ? (
              <a
                href={project.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-4 py-2 rounded-xl text-sm transition shadow-lg shadow-emerald-600/20 cursor-pointer"
              >
                View Live Demo ↗
              </a>
            ) : (
              <span className="text-xs text-slate-500 bg-slate-900/60 border border-slate-800 px-3 py-2 rounded-xl">
                Live demo not available
              </span>
            )}
            <a
              href={project.htmlUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-4 py-2 rounded-xl text-sm transition shadow-lg shadow-indigo-600/30 cursor-pointer"
            >
              View on GitHub ↗
            </a>
          </div>
        </div>

        <p className="text-slate-300 text-base leading-relaxed border-t border-slate-700/40 pt-4">
          {project.description}
        </p>

        {/* 2. Topics */}
        <div className="space-y-2">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Topics</h4>
          {project.topics && project.topics.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {project.topics.map((topic, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 rounded-lg text-xs font-medium"
                >
                  #{topic}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-500 italic">No topics available</p>
          )}
        </div>
      </div>

      {/* 3. Project Statistics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-slate-800/40 border border-slate-700/60 rounded-2xl p-4 text-center">
          <div className="text-xs text-slate-400 font-medium">⭐ Stars</div>
          <div className="text-2xl font-extrabold text-amber-400 mt-1">{stats.stars}</div>
        </div>
        <div className="bg-slate-800/40 border border-slate-700/60 rounded-2xl p-4 text-center">
          <div className="text-xs text-slate-400 font-medium">🍴 Forks</div>
          <div className="text-2xl font-extrabold text-cyan-400 mt-1">{stats.forks}</div>
        </div>
        <div className="bg-slate-800/40 border border-slate-700/60 rounded-2xl p-4 text-center">
          <div className="text-xs text-slate-400 font-medium">👁 Watchers</div>
          <div className="text-2xl font-extrabold text-purple-400 mt-1">{stats.watchers}</div>
        </div>
        <div className="bg-slate-800/40 border border-slate-700/60 rounded-2xl p-4 text-center">
          <div className="text-xs text-slate-400 font-medium">⚠️ Open Issues</div>
          <div className="text-2xl font-extrabold text-rose-400 mt-1">{stats.openIssues}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 4. Technologies Breakdown */}
        <div className="bg-slate-800/40 border border-slate-700/60 rounded-3xl p-6 space-y-4">
          <h3 className="text-lg font-bold text-white border-b border-slate-700/50 pb-3">
            Technologies Used
          </h3>
          {technologies && technologies.length > 0 ? (
            <div className="space-y-4 pt-2">
              {technologies.map((tech, index) => (
                <div key={index} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-200">{tech.name}</span>
                    <span className="text-indigo-400">{tech.percentage}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full transition-all duration-500"
                      style={{ width: `${tech.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-400">No language data detected for this repository.</p>
          )}
        </div>

        {/* 5. Repository Details */}
        <div className="bg-slate-800/40 border border-slate-700/60 rounded-3xl p-6 space-y-4">
          <h3 className="text-lg font-bold text-white border-b border-slate-700/50 pb-3">
            Repository Details
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between py-1.5 border-b border-slate-700/30">
              <span className="text-slate-400">Created</span>
              <span className="text-slate-200 font-medium">{formatDate(dates.created)}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-700/30">
              <span className="text-slate-400">Last Updated</span>
              <span className="text-slate-200 font-medium">{formatDate(dates.updated)}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-700/30">
              <span className="text-slate-400">Last Push</span>
              <span className="text-slate-200 font-medium">{formatDate(dates.pushed)}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-700/30">
              <span className="text-slate-400">Default Branch</span>
              <span className="text-indigo-300 font-mono text-xs bg-slate-900 px-2 py-1 rounded">
                {project.defaultBranch}
              </span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-700/30">
              <span className="text-slate-400">License</span>
              <span className="text-emerald-400 font-semibold">{project.license}</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-slate-400">Repository Size</span>
              <span className="text-slate-200 font-medium">{project.size} KB</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}