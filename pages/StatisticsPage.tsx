import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useData } from '../hooks/useData.ts';
import type { StatisticsPageData } from '../types.ts';
import LoadingSpinner from '../components/LoadingSpinner.tsx';
import ImageGenerator from '../components/ImageGenerator.tsx';

const StatisticsPage: React.FC = () => {
  const { data, loading, error } = useData<StatisticsPageData>('statistics');

  if (loading) return <div className="flex justify-center items-center h-96"><LoadingSpinner /></div>;
  if (error) return <p className="text-red-500">Error loading statistics: {error.message}</p>;
  if (!data) return null;

  return (
    <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-green-700 mb-2">{data.title}</h1>
      <p className="text-gray-600 mb-8 leading-relaxed">{data.description}</p>
      
      {data.image_prompt && <ImageGenerator prompt={data.image_prompt} />}

      <div style={{ width: '100%', height: 400 }} className="mt-8">
        <ResponsiveContainer>
          <BarChart
            data={data.chartData}
            margin={{
              top: 5, right: 30, left: 20, bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" angle={-15} textAnchor="end" height={60} interval={0} />
            <YAxis label={{ value: 'Percentage', angle: -90, position: 'insideLeft' }} />
            <Tooltip
                formatter={(value: number) => [`${value}%`, 'Percentage']}
                cursor={{fill: 'rgba(236, 252, 241, 0.5)'}}
            />
            <Legend />
            <Bar dataKey="percentage" fill="#16a34a" name="Distribution Percentage" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StatisticsPage;