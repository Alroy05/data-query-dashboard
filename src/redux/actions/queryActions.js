export const SUBMIT_QUERY = 'SUBMIT_QUERY';
export const SET_RESULTS = 'SET_RESULTS';
export const SET_LOADING = 'SET_LOADING';
export const SET_ERROR = 'SET_ERROR';
export const ADD_TO_HISTORY = 'ADD_TO_HISTORY';
export const SET_AI_SUGGESTIONS = 'SET_AI_SUGGESTIONS';

export const submitQuery = (query) => ({
  type: SUBMIT_QUERY,
  payload: query
});

export const setResults = (results) => ({
  type: SET_RESULTS,
  payload: results
});

export const setLoading = (isLoading) => ({
  type: SET_LOADING,
  payload: isLoading
});

export const setError = (error) => ({
  type: SET_ERROR,
  payload: error
});

export const addToHistory = (query) => ({
  type: ADD_TO_HISTORY,
  payload: query
});

export const setAiSuggestions = (suggestions) => ({
  type: SET_AI_SUGGESTIONS,
  payload: suggestions
});

// Thunk action for processing query
export const processQuery = (query) => async (dispatch) => {
  dispatch(setLoading(true));
  dispatch(submitQuery(query));
  dispatch(addToHistory(query));
  
  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Try to process the query
    const results = simulateQueryProcessing(query);
    
    // If we got results, use them
    if (results) {
      dispatch(setResults(results));
      dispatch(setError(null));
    } else {
      // If no results, generate mock data
      const mockResults = generateMockChartData(query);
      dispatch(setResults(mockResults));
      dispatch(setError(null));
    }
  } catch (error) {
    console.error('Query processing error:', error);
    // On error, generate mock data
    const mockResults = generateMockChartData(query);
    dispatch(setResults(mockResults));
    dispatch(setError('Showing mock data as the query couldn\'t be processed'));
  } finally {
    dispatch(setLoading(false));
  }
};

// Generate mock chart data when query fails
const generateMockChartData = (query) => {
  const { data, countries } = require('../utils/mockData');
  const selectedCountries = countries.slice(0, 3 + Math.floor(Math.random() * 4));
  
  const mockData = {};
  selectedCountries.forEach(country => {
    mockData[country] = {};
    let baseValue = Math.floor(Math.random() * 500) + 100;
    
    for (let year = 2010; year <= 2024; year++) {
      const variation = Math.floor(Math.random() * 100) - 30;
      mockData[country][year] = Math.max(100, baseValue + variation);
      baseValue += Math.floor(Math.random() * 20);
    }
  });
  
  return {
    type: 'mock',
    query,
    data: mockData
  };
};

// Mock query processing
const simulateQueryProcessing = (query) => {
  const { data, countries, years } = require('../utils/mockData');
  
  // Simple query parsing for demo purposes
  const lowerQuery = query.toLowerCase();
  
  // Default view - all data
  if (!query || lowerQuery.includes('all') || lowerQuery.includes('show me')) {
    return { type: 'all', data };
  }
  
  // Country-specific queries
  const matchedCountry = countries.find(country => 
    lowerQuery.includes(country.toLowerCase())
  );
  
  if (matchedCountry) {
    return { 
      type: 'country', 
      country: matchedCountry,
      data: { [matchedCountry]: data[matchedCountry] }
    };
  }
  
  // Year range queries
  const yearMatch = lowerQuery.match(/(\d{4})\s*to\s*(\d{4})/);
  if (yearMatch) {
    const startYear = parseInt(yearMatch[1]);
    const endYear = parseInt(yearMatch[2]);
    
    const filteredData = {};
    countries.forEach(country => {
      filteredData[country] = {};
      for (let year = startYear; year <= endYear; year++) {
        if (data[country][year]) {
          filteredData[country][year] = data[country][year];
        }
      }
    });
    
    return { type: 'year-range', startYear, endYear, data: filteredData };
  }
  
  // Top countries query
  if (lowerQuery.includes('top') || lowerQuery.includes('highest')) {
    const countMatch = lowerQuery.match(/top\s*(\d+)/);
    const count = countMatch ? parseInt(countMatch[1]) : 3;
    
    // Calculate average imports for each country
    const averages = countries.map(country => {
      const values = Object.values(data[country]);
      const avg = values.reduce((sum, val) => sum + val, 0) / values.length;
      return { country, avg };
    });
    
    // Sort by average descending
    averages.sort((a, b) => b.avg - a.avg);
    
    // Get top countries
    const topCountries = averages.slice(0, count).map(item => item.country);
    
    const topData = {};
    topCountries.forEach(country => {
      topData[country] = data[country];
    });
    
    return { type: 'top-countries', count, data: topData };
  }
  
  // Default fallback - return all data
  return { type: 'all', data };
};