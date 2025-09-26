import React, { useState } from 'react';
// Fix: Corrected import statement for react-router-dom
import { NavLink } from 'react-router-dom';
import ThemeSwitcher from './ThemeSwitcher.tsx';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Statistics', path: '/statistics' },
  { name: 'Irrigation', path: '/irrigation' },
  { name: 'Crops', path: '/crops' },
  { name: 'Plants', path: '/plants' },
  { name: 'Vertical Farming', path: '/vertical-farming' },
  { name: 'Plant Diseases', path: '/plant-diseases' },
];

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const baseLinkClasses = "px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ease-in-out";
  const inactiveLinkClasses = "text-gray-600 dark:text-gray-300 hover:bg-green-100 dark:hover:bg-gray-700 hover:text-green-800 dark:hover:text-white";
  const activeLinkClasses = "bg-green-600 text-white";

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <NavLink to="/" className="text-2xl font-bold text-green-700 dark:text-green-400">
              PixelSite Jordan
            </NavLink>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `${baseLinkClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>
          </div>
          <div className="flex items-center">
             <div className="hidden md:block">
                <ThemeSwitcher />
             </div>
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 dark:text-gray-300 hover:text-white hover:bg-green-600 dark:hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-700">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) => 
                  `block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'bg-green-600 text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-green-100 dark:hover:bg-gray-700'}`
                }
              >
                {link.name}
              </NavLink>
            ))}
             <div className="px-3 pt-4 pb-2 border-t border-gray-200 dark:border-gray-700">
                <ThemeSwitcher />
             </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;