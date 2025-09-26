import React from 'react';
// Fix: Corrected import statement for react-router-dom
import { Link } from 'react-router-dom';
import { useData } from '../hooks/useData.ts';
import type { HomePageData } from '../types.ts';
import LoadingSpinner from '../components/LoadingSpinner.tsx';

const HomePage: React.FC = () => {
  const { data, loading, error } = useData<HomePageData>('home');

  if (loading) return <div className="flex justify-center items-center h-64"><LoadingSpinner /></div>;
  if (error) return <p className="text-red-500">Error loading content: {error.message}</p>;
  if (!data) return null;

  return (
    <div className="space-y-12">
      <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <h1 className="text-4xl md:text-5xl font-extrabold text-green-700 dark:text-green-400 mb-4">{data.title}</h1>
        <p className="max-w-3xl mx-auto text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
          {data.introduction}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {data.key_topics.map((topic) => (
          <Link 
            key={topic.title} 
            to={topic.path}
            className="block p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 ease-in-out dark:border dark:border-gray-700"
          >
            <h2 className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">{topic.title}</h2>
            <p className="text-gray-600 dark:text-gray-300">{topic.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;