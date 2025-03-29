import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import QueryInput from './components/QueryInput';
import QueryHistory from './components/QueryHistory';
import ResultsDisplay from './components/ResultsDisplay';

function App() {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50">
        {/* Animated background elements */}
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute top-60 right-20 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/2 w-64 h-64 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative z-10">
          {/* Header */}
          <header className="bg-white/70 backdrop-blur-md shadow-sm sticky top-0 z-20">
            <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Oil Imports Analytics
                </h1>
              </div>
            </div>
          </header>

          <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
            <QueryInput />
            
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
              <div className="lg:col-span-1">
                <QueryHistory />
              </div>
              <div className="lg:col-span-3">
                <ResultsDisplay />
              </div>
            </div>
          </main>
        </div>
      </div>
    </Provider>
  );
}

export default App;