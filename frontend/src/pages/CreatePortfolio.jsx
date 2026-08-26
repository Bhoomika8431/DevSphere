// src/pages/CreatePortfolio.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { analyzeRepository, savePortfolio } from '../services/portfolioApi';
import ProjectAnalysisResult from '../components/ProjectAnalysisResult';

export default function CreatePortfolio() {
  const [repoUrl, setRepoUrl] = useState('');
  const [projectData, setProjectData] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // 1. Handle Repo Analysis & Normalize Data Payload
  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (!repoUrl.trim()) return;

    setIsAnalyzing(true);
    setError(null);

    try {
      const response = await analyzeRepository(repoUrl);
      const rawData = response.data || response;

      // 📌 Normalize incoming GitHub payload to guarantee clean strings for components
      const normalizedData = {
        ...rawData,
        project: {
          ...rawData.project,
          name: rawData.project?.name || rawData.title || 'Untitled Project',
          owner: typeof rawData.project?.owner === 'object' 
            ? rawData.project?.owner?.login 
            : (rawData.owner || rawData.project?.owner || 'unknown'),
          ownerAvatar: rawData.project?.owner?.avatar_url || rawData.project?.ownerAvatar || '',
          htmlUrl: rawData.project?.html_url || rawData.repoUrl || '',
          description: rawData.project?.description || '',
        }
      };

      setProjectData(normalizedData);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to analyze repository');
    } finally {
      setIsAnalyzing(false);
    }
  };

  // 2. Handle Publish Live Portfolio
  const handleSavePortfolio = async () => {
    if (!projectData) return;

    setIsPublishing(true);
    setError(null);

    try {
      const response = await savePortfolio(projectData);
      const savedId = response?.data?.id || response?.id || Date.now().toString();

      navigate(`/portfolio/${savedId}`);
    } catch (err) {
      console.error('Publish Error:', err);
      setError(err.message || 'Failed to publish portfolio.');
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Header Form */}
      <div className="text-center space-y-3">
        <h1 className="text-3xl font-extrabold text-white">Create Your Developer Portfolio</h1>
        <p className="text-slate-400">
          Add your GitHub projects and let DevSphere transform them into professional portfolio content.
        </p>
      </div>

      <form onSubmit={handleAnalyze} className="bg-slate-800/60 p-6 rounded-2xl border border-slate-700/60 flex gap-4">
        <input
          type="text"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
          placeholder="Enter GitHub Project URL"
          className="flex-1 bg-slate-900 border border-slate-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500"
          required
        />
        <button
          type="submit"
          disabled={isAnalyzing}
          className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-semibold px-6 py-3 rounded-xl transition cursor-pointer"
        >
          {isAnalyzing ? 'Analyzing...' : 'Analyze Project'}
        </button>
      </form>

      {error && (
        <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-400 text-sm text-center">
          ⚠️ {error}
        </div>
      )}

      {/* Analysis Output Result */}
      {projectData && (
        <div className="space-y-6">
          <ProjectAnalysisResult data={projectData} onRegenerate={handleAnalyze} />

          <div className="flex justify-end">
            <button
              onClick={handleSavePortfolio}
              disabled={isPublishing}
              className="bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-bold px-6 py-3 rounded-xl transition shadow-lg shadow-emerald-500/20 flex items-center gap-2 cursor-pointer"
            >
              {isPublishing ? 'Publishing...' : 'Publish Live Portfolio ✨'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}