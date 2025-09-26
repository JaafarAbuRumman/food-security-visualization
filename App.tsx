import React from 'react';
// Fix: Corrected import statement for react-router-dom
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header.tsx';
import Footer from './components/Footer.tsx';

// Switched from lazy to static imports to fix module resolution errors
import HomePage from './pages/HomePage.tsx';
import StatisticsPage from './pages/StatisticsPage.tsx';
import IrrigationPage from './pages/IrrigationPage.tsx';
import CropsPage from './pages/CropsPage.tsx';
import PlantsPage from './pages/PlantsPage.tsx';
import VerticalFarmingPage from './pages/VerticalFarmingPage.tsx';
import PlantDiseasesPage from './pages/PlantDiseasesPage.tsx';
import NotFoundPage from './pages/NotFoundPage.tsx';
import { ThemeProvider } from './contexts/ThemeContext.tsx';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col font-sans bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-200 transition-colors duration-300">
        <Header />
        <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/statistics" element={<StatisticsPage />} />
            <Route path="/irrigation" element={<IrrigationPage />} />
            <Route path="/crops" element={<CropsPage />} />
            <Route path="/plants" element={<PlantsPage />} />
            <Route path="/vertical-farming" element={<VerticalFarmingPage />} />
            <Route path="/plant-diseases" element={<PlantDiseasesPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default App;