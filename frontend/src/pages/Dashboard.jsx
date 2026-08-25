import React, { useState } from 'react';
import { Plus, FolderGit2, Eye, Edit3, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [portfolios] = useState([
    {
      _id: '1',
      title: 'Full Stack Engineer Portfolio',
      githubUsername: 'devsphere-user',
      updatedAt: '2026-08-24',
      isPublished: true,
      theme: 'dark'
    }
  ]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="bg-gradient-to-r from-indigo-900/60 via-slate-900 to-slate-900 border border-indigo-500/20 rounded-2xl p-8 mb-10 relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <span className="inline-flex items-center space-x-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>DevSphere Command Center</span>
          </span>
          <h1 className="text-3xl font-extrabold text-white mb-2">Welcome Back, Developer</h1>
          <p className="text-slate-400 text-sm mb-6">
            Manage your generated portfolios, connect repositories, or tweak AI-enhanced summaries.
          </p>
          <button className="inline-flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-5 py-2.5 rounded-xl shadow-lg shadow-indigo-600/30 transition-all text-sm">
            <Plus className="w-4 h-4" />
            <span>Create New Portfolio</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <div className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-1">Total Portfolios</div>
          <div className="text-2xl font-bold text-white">{portfolios.length}</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <div className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-1">Live Sites</div>
          <div className="text-2xl font-bold text-emerald-400">1</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <div className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-1">Active Theme</div>
          <div className="text-2xl font-bold text-indigo-400 capitalize">Dark Cyber</div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold text-white mb-6">Your Portfolios</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {portfolios.map((item) => (
            <div key={item._id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-3">
                  <span className="inline-flex items-center space-x-1.5 text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Published</span>
                  </span>
                  <span className="text-xs font-mono text-slate-500">Updated {item.updatedAt}</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-1">{item.title}</h3>
                <p className="text-slate-400 text-xs mb-4 flex items-center space-x-1 font-mono">
                  <FolderGit2 className="w-3.5 h-3.5 text-indigo-400" />
                  <span>github.com/{item.githubUsername}</span>
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-800/80">
                <button className="flex-1 bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium py-2 rounded-xl flex items-center justify-center space-x-1">
                  <Eye className="w-3.5 h-3.5 text-slate-400" />
                  <span>Preview</span>
                </button>
                <button className="flex-1 bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 text-xs font-medium py-2 rounded-xl flex items-center justify-center space-x-1">
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit Data</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
