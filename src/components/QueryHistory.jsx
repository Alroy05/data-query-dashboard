import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { processQuery } from '../redux/actions/queryActions';

const QueryHistory = () => {
  const queryHistory = useSelector(state => state.query.queryHistory);
  const dispatch = useDispatch();
  
  const handleHistoryClick = (query) => {
    dispatch(processQuery(query));
  };
  
  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-5 h-full border border-white/30">
      <div className="flex items-center mb-4">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg shadow-md mr-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Query History
        </h3>
      </div>
      
      <div className="border-t border-white/30 mb-4"></div>
      
      {queryHistory.length === 0 ? (
        <div className="text-center py-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm text-gray-500">Your query history will appear here</p>
        </div>
      ) : (
        <ul className="space-y-2 max-h-[calc(100vh-250px)] overflow-y-auto pr-2">
          {queryHistory.map((query, index) => (
            <li 
              key={index}
              className="p-3 text-sm font-medium text-gray-700 hover:bg-purple-50/50 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-sm border border-white/30"
              onClick={() => handleHistoryClick(query)}
            >
              <div className="flex items-start">
                <span className="bg-blue-100 text-blue-600 rounded-full p-1 mr-3 mt-0.5 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                  </svg>
                </span>
                <span className="truncate">{query}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default QueryHistory;