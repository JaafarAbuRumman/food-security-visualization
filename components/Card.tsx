
import React from 'react';

interface CardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ title, children, className }) => {
  return (
    <div className={`bg-white rounded-lg shadow-lg overflow-hidden transition-shadow duration-300 hover:shadow-xl ${className}`}>
      <div className="p-6">
        <h3 className="text-xl font-bold text-green-700 mb-3">{title}</h3>
        <div className="text-gray-600 space-y-2">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Card;
