
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white mt-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="text-center text-sm">
          <p>&copy; {new Date().getFullYear()} PixelSite Web Design Competition. All Rights Reserved.</p>
          <p className="mt-1">A Project on Food Security in Jordan</p>
          <p className="mt-2">Created by <strong>Jaafar Abu Rumman</strong></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;