import React, { useState, useMemo } from 'react';
import { useData } from '../hooks/useData.ts';
import type { PlantsPageData, Category } from '../types.ts';
import LoadingSpinner from '../components/LoadingSpinner.tsx';
import Card from '../components/Card.tsx';
import ImageGenerator from '../components/ImageGenerator.tsx';

const PlantsPage: React.FC = () => {
  const { data, loading, error } = useData<PlantsPageData>('plants');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('All');

  const filteredCategories = useMemo(() => {
    if (!data) return [];
    
    return data.categories.map(category => {
        if (filterType !== 'All' && category.title !== filterType) {
            return null;
        }

        const filteredItems = category.items.filter(item =>
            item.toLowerCase().includes(searchQuery.toLowerCase())
        );

        if (filteredItems.length === 0) {
            return null;
        }

        return { ...category, items: filteredItems };
    }).filter((category): category is Category => category !== null);
  }, [data, searchQuery, filterType]);

  if (loading) return <div className="flex justify-center items-center h-64"><LoadingSpinner /></div>;
  if (error) return <p className="text-red-500">Error loading content: {error.message}</p>;
  if (!data) return null;

  return (
    <div className="space-y-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
            <h1 className="text-3xl font-bold text-green-700 dark:text-green-400 mb-2">{data.title}</h1>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed max-w-4xl mx-auto">{data.description}</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex flex-col md:flex-row gap-4 items-center">
          <input
              type="text"
              placeholder="Search for a plant..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-grow w-full md:w-auto p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-green-500 focus:border-green-500"
          />
          <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full md:w-auto p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-green-500 focus:border-green-500"
          >
              <option value="All">All Types</option>
              {data.categories.map(cat => <option key={cat.title} value={cat.title}>{cat.title}</option>)}
          </select>
        </div>

        {data.image_prompt && <ImageGenerator prompt={data.image_prompt} />}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredCategories.length > 0 ? (
                filteredCategories.map((category) => (
                    <Card key={category.title} title={category.title}>
                        <ul className="list-disc list-inside space-y-2">
                            {category.items.map((item, index) => <li key={index}>{item}</li>)}
                        </ul>
                    </Card>
                ))
            ) : (
                <div className="lg:col-span-2 text-center py-10 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                    <p className="text-gray-500 dark:text-gray-400">No matching plants found.</p>
                </div>
            )}
        </div>
    </div>
  );
};

export default PlantsPage;