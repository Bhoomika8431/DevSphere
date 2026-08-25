import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="max-w-6xl mx-auto text-white space-y-20 py-8">
      {/* Hero Section */}
      <section className="text-center space-y-6 max-w-3xl mx-auto">
        <div className="inline-block px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold tracking-wide uppercase">
          AI-Powered Portfolio Generator
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight">
          Transform Your Code Into a <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">Stunning Portfolio</span>
        </h1>
        <p className="text-slate-400 text-lg sm:text-xl leading-relaxed">
          DevSphere analyzes your GitHub repositories to automatically generate, host, and customize professional portfolio websites in seconds.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button
            type="button"
            onClick={() => navigate('/create-portfolio')}
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-6 py-3 rounded-xl transition shadow-lg shadow-indigo-600/30 cursor-pointer"
          >
            Build Your Portfolio
          </button>
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="bg-slate-800 hover:bg-slate-700/80 border border-slate-700 text-slate-200 font-semibold px-6 py-3 rounded-xl transition cursor-pointer"
          >
            View Dashboard
          </button>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-slate-800/40 border border-slate-700/60 rounded-2xl p-6 space-y-3">
          <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 text-xl font-bold">
            ⚡
          </div>
          <h3 className="text-xl font-bold">Instant Setup</h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            Paste your GitHub repository URL and let DevSphere extract project details, tech stacks, and metadata automatically.
          </p>
        </div>

        <div className="bg-slate-800/40 border border-slate-700/60 rounded-2xl p-6 space-y-3">
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 text-xl font-bold">
            🎨
          </div>
          <h3 className="text-xl font-bold">Full Customization</h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            Easily update bios, reorder tech stacks, and edit showcase details directly from your interactive dashboard.
          </p>
        </div>

        <div className="bg-slate-800/40 border border-slate-700/60 rounded-2xl p-6 space-y-3">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 text-xl font-bold">
            🚀
          </div>
          <h3 className="text-xl font-bold">Ready to Share</h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            Publish your generated developer portfolio with a single click and share it with recruiters or clients.
          </p>
        </div>
      </section>

      {/* CTA Card */}
      <section className="bg-gradient-to-r from-indigo-900/40 to-slate-800/60 border border-indigo-500/30 rounded-3xl p-8 sm:p-12 text-center space-y-4">
        <h2 className="text-2xl sm:text-3xl font-bold">Ready to Showcase Your Work?</h2>
        <p className="text-slate-300 max-w-xl mx-auto text-sm sm:text-base">
          Join developers who use DevSphere to showcase their GitHub projects effortlessly.
        </p>
        <div className="pt-2">
          <button
            type="button"
            onClick={() => navigate('/create-portfolio')}
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-6 py-3 rounded-xl transition cursor-pointer"
          >
            Get Started Now
          </button>
        </div>
      </section>
    </div>
  );
}