import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';

interface ImageGeneratorProps {
  prompt: string;
}

const ImageGenerator: React.FC<ImageGeneratorProps> = ({ prompt }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateImage = async () => {
    setLoading(true);
    setError(null);
    setImageUrl(null);

    try {
      if (!process.env.API_KEY) {
        throw new Error("API key is not configured.");
      }
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateImages({
        model: 'imagen-4.0-generate-001',
        prompt: prompt,
        config: {
          numberOfImages: 1,
          outputMimeType: 'image/jpeg',
          aspectRatio: '16:9',
        },
      });
      
      const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
      const url = `data:image/jpeg;base64,${base64ImageBytes}`;
      setImageUrl(url);

    } catch (e) {
      const error = e as Error;
      console.error("Image generation failed:", error);
      setError(`Failed to generate image. ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-6 p-4 border-2 border-dashed border-green-200 rounded-lg text-center">
      {imageUrl && (
        <div className="mb-4">
          <img 
            src={imageUrl} 
            alt="Generated visualization" 
            className="rounded-lg shadow-md mx-auto max-h-96 w-auto"
          />
        </div>
      )}
      
      {loading ? (
        <div className="flex items-center justify-center space-x-2">
            <div className="w-4 h-4 rounded-full animate-pulse bg-green-600"></div>
            <div className="w-4 h-4 rounded-full animate-pulse bg-green-600" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-4 h-4 rounded-full animate-pulse bg-green-600" style={{ animationDelay: '0.4s' }}></div>
            <span className="text-gray-600 ml-2">Generating Image...</span>
        </div>
      ) : (
        <button
          onClick={handleGenerateImage}
          disabled={loading}
          className="bg-green-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-green-700 transition-colors duration-300 disabled:bg-gray-400"
        >
          {imageUrl ? 'Regenerate Visualization' : 'Generate a Visualization'}
        </button>
      )}

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default ImageGenerator;