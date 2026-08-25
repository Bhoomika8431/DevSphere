import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

export default function Layout() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-slate-900 text-slate-100 flex flex-col font-sans">
      {/* Top Navbar */}
      <nav className="bg-slate-800/80 backdrop-blur border-b border-slate-700 px-8 py-4 flex items-center justify-between sticky top-0 z-50">
        <div 
          className="flex items-center space-x-3 cursor-pointer" 
          onClick={() => navigate('/dashboard')}
        >
          <h1 className="text-2xl font-extrabold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            DevSphere
          </h1>
        </div>
        <button
          type="button"
          onClick={() => navigate('/dashboard')}
          className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-4 py-2 rounded-xl transition cursor-pointer"
        >
          Dashboard
        </button>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 w-full py-6 px-4 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
}