import React from 'react';
import { useData } from '../hooks/useData.ts';
import type { PlantsPageData } from '../types.ts';
import LoadingSpinner from '../components/LoadingSpinner.tsx';
import Card from '../components/Card.tsx';
import ImageGenerator from '../components/ImageGenerator.tsx';

const PlantsPage: React.FC = () => {
  const { data, loading, error } = useData<PlantsPageData>('plants');

  if (loading) return <div className="flex justify-center items-center h-64"><LoadingSpinner /></div>;
  if (error) return <p className="text-red-500">Error loading content: {error.message}</p>;
  if (!data) return null;

  return (
    <div className="space-y-8">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h1 className="text-3xl font-bold text-green-700 mb-2">{data.title}</h1>
            <p className="text-gray-600 leading-relaxed max-w-4xl mx-auto">{data.description}</p>
        </div>

        {data.image_prompt && <ImageGenerator prompt={data.image_prompt} />}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {data.categories.map((category) => (
                <Card key={category.title} title={category.title}>
                    <ul className="list-disc list-inside space-y-2">
                        {category.items.map((item, index) => <li key={index}>{item}</li>)}
                    </ul>
                </Card>
            ))}
        </div>
    </div>
  );
};

export default PlantsPage;