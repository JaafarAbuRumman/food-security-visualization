
import React from 'react';

interface CardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ title, children, className }) => {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl dark:border dark:border-gray-700 ${className}`}>
      <div className="p-6">
        <h3 className="text-xl font-bold text-green-700 dark:text-green-400 mb-3">{title}</h3>
        <div className="text-gray-600 dark:text-gray-300 space-y-2">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Card;