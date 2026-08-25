import React from 'react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  return (
    <div className="relative z-10 p-8 max-w-6xl mx-auto space-y-8">
      {/* Banner Section */}
      <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-8 shadow-xl">
        <span className="text-xs font-semibold tracking-wider text-indigo-400 bg-indigo-950/50 border border-indigo-800/50 px-3 py-1 rounded-full uppercase">
          ✨ DevSphere Command Center
        </span>
        <h1 className="text-3xl font-bold text-white mt-4">Welcome Back, Developer</h1>
        <p className="text-slate-400 mt-1 mb-6">
          Manage your generated portfolios, connect repositories, or tweak AI-enhanced summaries.
        </p>

        {/* LINK 1: Create New Portfolio */}
        <Link
          to="/create-portfolio"
          className="relative z-20 inline-block bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-5 py-2.5 rounded-xl shadow-lg shadow-indigo-600/30 transition duration-200 active:scale-95 cursor-pointer"
        >
          + Create New Portfolio
        </Link>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-800/40 border border-slate-700/50 p-6 rounded-2xl">
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Total Portfolios</p>
          <p className="text-3xl font-bold text-white mt-2">1</p>
        </div>
        <div className="bg-slate-800/40 border border-slate-700/50 p-6 rounded-2xl">
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Live Sites</p>
          <p className="text-3xl font-bold text-emerald-400 mt-2">1</p>
        </div>
        <div className="bg-slate-800/40 border border-slate-700/50 p-6 rounded-2xl">
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Active Theme</p>
          <p className="text-2xl font-bold text-indigo-400 mt-2">Dark Cyber</p>
        </div>
      </div>

      {/* Your Portfolios Section */}
      <div>
        <h2 className="text-xl font-bold text-white mb-4">Your Portfolios</h2>
        <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 max-w-lg space-y-4 shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2.5 py-1 rounded-full font-medium">
              ● Published
            </span>
            <span className="text-xs text-slate-500 font-mono">Updated 2026-08-24</span>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white">Full Stack Engineer Portfolio</h3>
            <p className="text-sm text-slate-400 font-mono mt-0.5">github.com/devsphere-user</p>
          </div>

          <div className="flex items-center gap-3 pt-2">
            {/* LINK 2: Preview */}
            <a
              href="https://github.com/devsphere-user"
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-20 flex-1 text-center bg-slate-700/50 hover:bg-slate-700 text-slate-200 text-sm font-medium py-2 rounded-xl border border-slate-600/50 transition active:scale-95 cursor-pointer"
            >
              👁 Preview
            </a>

            {/* LINK 3: Edit Data */}
            <Link
              to="/edit/1"
              className="relative z-20 flex-1 text-center bg-indigo-900/40 hover:bg-indigo-800/60 text-indigo-200 text-sm font-medium py-2 rounded-xl border border-indigo-700/50 transition active:scale-95 cursor-pointer"
            >
              ✏️ Edit Data
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}