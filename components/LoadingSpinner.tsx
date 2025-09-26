
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center space-x-2">
      <div className="w-4 h-4 rounded-full animate-pulse bg-green-600"></div>
      <div className="w-4 h-4 rounded-full animate-pulse bg-green-600" style={{ animationDelay: '0.2s' }}></div>
      <div className="w-4 h-4 rounded-full animate-pulse bg-green-600" style={{ animationDelay: '0.4s' }}></div>
      <span className="text-gray-600 ml-2">Loading...</span>
    </div>
  );
};

export default LoadingSpinner;
