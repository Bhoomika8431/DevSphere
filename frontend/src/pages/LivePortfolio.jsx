import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchPortfolioById } from '../services/portfolioApi';
import ProjectAnalysisResult from '../components/ProjectAnalysisResult';

export default function LivePortfolio() {
  const { id } = useParams(); // Extract ID from URL
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPortfolio = async () => {
      try {
        const data = await fetchPortfolioById(id);
        setPortfolio(data);
      } catch (err) {
        setPortfolio(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) loadPortfolio();
  }, [id]);

  if (loading) return <div className="text-white text-center py-12">Loading...</div>;

  if (!portfolio) {
    return (
      <div className="text-center py-16 text-white space-y-4">
        <h2 className="text-2xl font-bold">Portfolio Not Found</h2>
        <Link to="/dashboard" className="text-indigo-400 hover:underline inline-block">
          Back to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <ProjectAnalysisResult data={portfolio.projectData} />
    </div>
  );
}