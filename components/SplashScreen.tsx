import React from 'react';

const SplashScreen: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 dark:bg-gray-900 text-green-700 dark:text-green-400">
      <style>
        {`
          @keyframes grow {
            0% { transform: scale(0); opacity: 0; }
            70% { transform: scale(1.1); opacity: 1; }
            100% { transform: scale(1); opacity: 1; }
          }
          .seedling {
            animation: grow 1.5s ease-out forwards;
          }
          @keyframes fade-in {
            0% { opacity: 0; }
            100% { opacity: 1; }
          }
          .loading-text {
            animation: fade-in 1s ease-in 1s forwards;
            opacity: 0;
          }
        `}
      </style>
      <svg
        className="seedling w-24 h-24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4 12C4 12 5.6 15.2 8 16.8C10.4 18.4 12.8 18.4 14.4 16.8C16 15.2 16.8 12.8 16.8 10.4C16.8 8 15.2 4.8 12.8 4"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8 12C8 12 9.6 9.6 12 8C14.4 6.4 16.8 6.4 18.4 8C20 9.6 20.8 12 20.8 14.4C20.8 16.8 19.2 20 16.8 20"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 20V4"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <p className="loading-text text-xl font-semibold mt-4">
        Loading Food Security Portal...
      </p>
    </div>
  );
};

export default SplashScreen;
