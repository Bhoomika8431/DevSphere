import React from 'react';

export default function AnalysisLoader() {
  return (
    <div className="bg-slate-800/40 border border-slate-700/60 rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-xl animate-pulse max-w-2xl mx-auto">
      <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
      
      <div className="space-y-2">
        <h3 className="text-xl font-bold text-white">Analyzing your GitHub project...</h3>
        <p className="text-sm text-slate-400">Connecting to GitHub REST API and parsing metadata</p>
      </div>

      <div className="pt-4 max-w-xs mx-auto space-y-2 text-left text-xs text-slate-300">
        <div className="flex items-center gap-2 text-emerald-400">
          <span>✓</span> <span>Validating repository URL</span>
        </div>
        <div className="flex items-center gap-2 text-indigo-400">
          <span className="animate-spin">🌀</span> <span>Fetching project information</span>
        </div>
        <div className="flex items-center gap-2 text-slate-500">
          <span>○</span> <span>Detecting technology percentages</span>
        </div>
      </div>
    </div>
  );
}