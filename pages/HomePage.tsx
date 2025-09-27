import React from 'react';
// Fix: Corrected import statement for react-router-dom
import { Link } from 'react-router-dom';
import { useData } from '../hooks/useData.ts';
import type { HomePageData } from '../types.ts';
import LoadingSpinner from '../components/LoadingSpinner.tsx';
import ImageGenerator from '../components/ImageGenerator.tsx';

const HomePage: React.FC = () => {
  const { data, loading, error } = useData<HomePageData>('home');

  if (loading) return <div className="flex justify-center items-center h-64"><LoadingSpinner /></div>;
  if (error) return <p className="text-red-500">Error loading content: {error.message}</p>;
  if (!data) return null;

  return (
    <div className="space-y-12">
      <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <h1 className="text-4xl md:text-5xl font-extrabold text-green-700 dark:text-green-400 mb-4">{data.title}</h1>
        <p className="max-w-3xl mx-auto text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
          {data.introduction}
        </p>
      </div>

      {/* Video Player Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-200 mb-4">
          Future of Food Security in Jordan
        </h2>
        <p className="max-w-3xl mx-auto text-center text-gray-600 dark:text-gray-300 mb-6">
          This video highlights innovative solutions in agriculture and food security in Jordan, focusing on how technology and AI can shape a sustainable future.
        </p>
        <div className="aspect-video w-full max-w-4xl mx-auto rounded-lg overflow-hidden shadow-inner bg-black">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/CzM5IzqWcy4"
            title="Sustainable Agritourism in Jordan - Food Security Solutions"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      <div className="my-12">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-200 mb-8">Visual Explorations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {data.images.map(image => (
            <div key={image.title} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-3">{image.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{image.description}</p>
              <ImageGenerator prompt={image.image_prompt} />
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-200 mb-8">Discover More</h2>
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

    </div>
  );
};

export default HomePage;