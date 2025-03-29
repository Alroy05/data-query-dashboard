import React from 'react';
import { useSelector } from 'react-redux';
import ChartComponent from './ChartComponent';
import { data } from '../utils/mockData';

const ResultsDisplay = () => {
  const { results, loading, error, currentQuery } = useSelector(state => state.query);
  
  const getTitle = () => {
    if (!results) return 'Global Crude Oil Imports (2010-2024)';
    if (results.type === 'all') return 'Global Crude Oil Imports (2010-2024)';
    if (results.type === 'country') return `Crude Oil Imports for ${results.country}`;
    if (results.type === 'year-range') return `Crude Oil Imports (${results.startYear}-${results.endYear})`;
    if (results.type === 'top-countries') return `Top ${results.count} Countries by Crude Oil Imports`;
    if (results.type === 'mock') return `Results for "${results.query}"`;
    return 'Query Results';
  };
  
  const displayData = results ? results.data : data;
  
  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-6 h-full border border-white/30">
      <div className="flex justify-between items-start mb-6">
        <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {getTitle()}
        </h2>
        {results?.type === 'mock' && (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            Mock Data
          </span>
        )}
      </div>
      
      {loading ? (
        <div className="flex flex-col items-center justify-center h-64">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-ping"></div>
            </div>
          </div>
          <p className="mt-4 text-purple-600 font-medium">Processing your query...</p>
        </div>
      ) : error ? (
        <div className="bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-red-500 p-4 rounded-lg">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
          <ChartComponent data={displayData} />
        </div>
      ) : (
        <ChartComponent data={displayData} />
      )}
      
      {currentQuery && !loading && (
        <p className="mt-4 text-sm text-gray-500">
          Showing results for: <span className="font-medium text-purple-600">"{currentQuery}"</span>
        </p>
      )}
    </div>
  );
};

export default ResultsDisplay;