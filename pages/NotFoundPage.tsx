import React from 'react';
// Fix: Corrected import statement for react-router-dom
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div className="text-center py-20">
      <h1 className="text-6xl font-extrabold text-green-700">404</h1>
      <p className="text-2xl mt-4 mb-8 text-gray-600">Page Not Found</p>
      <p className="text-gray-500">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link 
        to="/" 
        className="mt-6 inline-block bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 transition-colors duration-300"
      >
        Go Back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
