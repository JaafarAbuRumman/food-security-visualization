import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useData } from '../hooks/useData.ts';
import type { StatisticsPageData } from '../types.ts';
import LoadingSpinner from '../components/LoadingSpinner.tsx';
import ImageGenerator from '../components/ImageGenerator.tsx';
import { useTheme } from '../contexts/ThemeContext.tsx';

const StatisticsPage: React.FC = () => {
  const { data, loading, error } = useData<StatisticsPageData>('statistics');
  const { theme } = useTheme();

  if (loading) return <div className="flex justify-center items-center h-96"><LoadingSpinner /></div>;
  if (error) return <p className="text-red-500">Error loading statistics: {error.message}</p>;
  if (!data) return null;

  const tickColor = theme === 'dark' ? '#d1d5db' : '#374151';
  const gridColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : '#ccc';
  const tooltipStyle = {
    backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
    borderColor: theme === 'dark' ? '#4b5563' : '#d1d5db',
    color: theme === 'dark' ? '#f9fafb' : '#1f2937',
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-green-700 dark:text-green-400 mb-2">{data.title}</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">{data.description}</p>
      
      {data.image_prompt && <ImageGenerator prompt={data.image_prompt} />}

      <div style={{ width: '100%', height: 400 }} className="mt-8">
        <ResponsiveContainer>
          <BarChart
            data={data.chartData}
            margin={{
              top: 5, right: 30, left: 20, bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor}/>
            <XAxis dataKey="name" angle={-15} textAnchor="end" height={60} interval={0} tick={{ fill: tickColor }} />
            <YAxis label={{ value: 'Percentage', angle: -90, position: 'insideLeft', fill: tickColor }} tick={{ fill: tickColor }}/>
            <Tooltip
                formatter={(value: number) => [`${value}%`, 'Percentage']}
                cursor={{fill: 'rgba(22, 163, 74, 0.1)'}}
                contentStyle={tooltipStyle}
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