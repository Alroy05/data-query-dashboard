import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { processQuery, setAiSuggestions } from '../redux/actions/queryActions';
import { getAiSuggestions } from '../utils/api';

const QueryInput = () => {
  const [inputValue, setInputValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const suggestions = useSelector(state => state.query.aiSuggestions);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      dispatch(processQuery(inputValue));
      setInputValue('');
      setShowSuggestions(false);
    }
  };
  
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (inputValue.trim()) {
        getAiSuggestions(inputValue).then(suggestions => {
          dispatch(setAiSuggestions(suggestions));
          setShowSuggestions(true);
        });
      } else {
        dispatch(setAiSuggestions([]));
        setShowSuggestions(false);
      }
    }, 300);
    
    return () => clearTimeout(delayDebounceFn);
  }, [inputValue, dispatch]);
  
  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
    setShowSuggestions(false);
    inputRef.current.focus();
  };
  
  return (
    <div className="mb-8 relative">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            ref={inputRef}
            type="text"
            className="block w-full pl-12 pr-14 py-4 bg-white/70 backdrop-blur-sm border border-white/30 rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-800 placeholder-purple-400 font-medium"
            placeholder="Ask about oil imports (e.g., 'Show India imports from 2015-2020')"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onFocus={() => inputValue.trim() && setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          />
          <button
            type="submit"
            className="absolute inset-y-0 right-0 pr-4 flex items-center"
          >
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              </svg>
            </div>
          </button>
        </div>
      </form>
      
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-20 mt-2 w-full bg-white/80 backdrop-blur-lg rounded-xl shadow-xl border border-white/30 overflow-hidden">
          <ul className="divide-y divide-white/30">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                className="px-4 py-3 hover:bg-purple-50/50 cursor-pointer text-gray-700 font-medium transition-colors duration-150"
                onMouseDown={() => handleSuggestionClick(suggestion)}
              >
                <div className="flex items-center">
                  <span className="bg-purple-100 text-purple-600 rounded-full p-1 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                    </svg>
                  </span>
                  {suggestion}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default QueryInput;