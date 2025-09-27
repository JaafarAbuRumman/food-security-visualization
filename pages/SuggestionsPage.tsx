import React, { useState } from 'react';
import { useData } from '../hooks/useData.ts';
import type { SuggestionsPageData } from '../types.ts';
import LoadingSpinner from '../components/LoadingSpinner.tsx';

const SuggestionsPage: React.FC = () => {
  const { data, loading, error } = useData<SuggestionsPageData>('suggestions');
  const [suggestion, setSuggestion] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (suggestion.trim() === '') return;
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      console.log('Submitted suggestion:', suggestion);
      setSubmitted(true);
      setIsSubmitting(false);
    }, 1000);
  };

  const handleReset = () => {
    setSuggestion('');
    setSubmitted(false);
  };

  if (loading) return <div className="flex justify-center items-center h-64"><LoadingSpinner /></div>;
  if (error) return <p className="text-red-500">Error loading content: {error.message}</p>;
  if (!data) return null;

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold text-green-700 dark:text-green-400 mb-2">{data.title}</h1>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed max-w-4xl mx-auto">{data.description}</p>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          {submitted ? (
            <div className="text-center">
              <h2 className="text-2xl font-bold text-green-600 dark:text-green-400 mb-4">Thank You!</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-6">Your suggestion has been received. We appreciate your contribution to improving food security in Jordan.</p>
              <button
                onClick={handleReset}
                className="bg-green-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-green-700 transition-colors duration-300"
              >
                Submit Another Suggestion
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="suggestion" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Your Suggestion or Note
                </label>
                <textarea
                  id="suggestion"
                  name="suggestion"
                  rows={6}
                  value={suggestion}
                  onChange={(e) => setSuggestion(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                  placeholder="Enter your thoughts here..."
                  required
                ></textarea>
              </div>
              <div className="text-right">
                <button
                  type="submit"
                  disabled={isSubmitting || suggestion.trim() === ''}
                  className="inline-flex items-center justify-center bg-green-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-green-700 transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </>
                  ) : 'Submit Idea'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default SuggestionsPage;
