import React, { useState, useEffect } from 'react';
import { useData } from '../hooks/useData.ts';
import type { InteractiveMapPageData } from '../types.ts';
import LoadingSpinner from '../components/LoadingSpinner.tsx';
import InteractiveMap from '../components/InteractiveMap.tsx';

const InteractiveMapPage: React.FC = () => {
  const { data, loading, error } = useData<InteractiveMapPageData>('interactive_map');
  const [mapData, setMapData] = useState<any>(null);
  const [mapLoading, setMapLoading] = useState(true);
  const [mapError, setMapError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchMapData = async () => {
      try {
        const response = await fetch('/jordan-map-data.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonData = await response.json();
        setMapData(jsonData);
      } catch (e) {
        setMapError(e as Error);
      } finally {
        setMapLoading(false);
      }
    };
    fetchMapData();
  }, []);

  if (loading) return <div className="flex justify-center items-center h-64"><LoadingSpinner /></div>;
  if (error) return <p className="text-red-500">Error loading page content: {error.message}</p>;
  if (!data) return null;

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold text-green-700 dark:text-green-400 mb-2">{data.title}</h1>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed max-w-4xl mx-auto">{data.description}</p>
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
        {mapLoading && <div className="flex justify-center items-center h-[600px]"><LoadingSpinner /></div>}
        {mapError && <p className="text-red-500 text-center h-[600px]">Error loading map data: {mapError.message}</p>}
        {!mapLoading && !mapError && mapData && <InteractiveMap geoJsonData={mapData} />}
      </div>
    </div>
  );
};

export default InteractiveMapPage;
