import React from 'react';
import { useData } from '../hooks/useData.ts';
import type { PlantDiseasesPageData } from '../types.ts';
import LoadingSpinner from '../components/LoadingSpinner.tsx';
import Card from '../components/Card.tsx';
import ImageGenerator from '../components/ImageGenerator.tsx';

const PlantDiseasesPage: React.FC = () => {
  const { data, loading, error } = useData<PlantDiseasesPageData>('plant_diseases');

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

      <div className="space-y-6">
        {data.diseases.map((disease) => (
          <Card key={disease.name} title={disease.name}>
            <p>{disease.text}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PlantDiseasesPage;