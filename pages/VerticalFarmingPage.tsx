import React from 'react';
import { useData } from '../hooks/useData.ts';
import type { VerticalFarmingPageData } from '../types.ts';
import LoadingSpinner from '../components/LoadingSpinner.tsx';
import Card from '../components/Card.tsx';
import ImageGenerator from '../components/ImageGenerator.tsx';

const VerticalFarmingPage: React.FC = () => {
  const { data, loading, error } = useData<VerticalFarmingPageData>('vertical_farming');

  if (loading) return <div className="flex justify-center items-center h-64"><LoadingSpinner /></div>;
  if (error) return <p className="text-red-500">Error loading content: {error.message}</p>;
  if (!data) return null;

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-green-700 mb-2">{data.title}</h1>
        <p className="text-gray-600 leading-relaxed">{data.description}</p>
      </div>

      {data.image_prompt && <ImageGenerator prompt={data.image_prompt} />}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {data.points.map((point) => (
          <Card key={point.title} title={point.title}>
            <p>{point.text}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default VerticalFarmingPage;