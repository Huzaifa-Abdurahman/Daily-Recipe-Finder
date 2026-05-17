"use client";

import { useState } from 'react';

export default function RecipeCard({ recipe }: { recipe: any }) {
  const [showSteps, setShowSteps] = useState(false);
  const [enhancedText, setEnhancedText] = useState('');
  const [enhancing, setEnhancing] = useState(false);
  const placeholderSrc = `https://placehold.co/800x480/fdfbf7/50301a?text=${encodeURIComponent(recipe.name)}`;
  const [imgSrc, setImgSrc] = useState<string | null>(recipe.image_url || null);

  const handleEnhance = async () => {
    setEnhancing(true);
    try {
      const response = await fetch('/api/enhance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recipeId: recipe.id })
      });
      const data = await response.json();
      setEnhancedText(data.enhancement);
    } catch (error) {
      console.error("Error enhancing recipe", error);
      setEnhancedText("Failed to enhance recipe. Please try again.");
    } finally {
      setEnhancing(false);
    }
  };

  return (
    <div className="bg-white dark:bg-[#3d2311] border border-cream dark:border-wood-light rounded-xl overflow-hidden shadow-sm hover:shadow-md transition">
      {(imgSrc || placeholderSrc) && (
        <img
          src={imgSrc || placeholderSrc}
          alt={recipe.name}
          className="w-full h-48 object-cover"
          onError={() => setImgSrc(placeholderSrc)}
        />
      )}
      <div className="p-5 space-y-4">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold text-wood dark:text-cream">{recipe.name}</h3>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-parrot/20 text-parrot-hover dark:text-parrot">
            {Math.round(recipe.matchPercentage)}% Match
          </span>
        </div>
        
        <div className="text-sm text-wood-light dark:text-cream-dark flex items-center space-x-4">
          <span>⏱ {recipe.cooking_time} mins</span>
          <span>📁 {recipe.category?.name || 'General'}</span>
        </div>

        <p className="text-wood-light/90 dark:text-cream-dark/90 text-sm line-clamp-2">{recipe.description}</p>

        <div className="pt-4 flex space-x-3 border-t border-cream dark:border-wood-light">
          <button 
            onClick={() => setShowSteps(!showSteps)}
            className="flex-1 bg-cream hover:bg-cream-dark dark:bg-wood-light dark:hover:bg-wood text-wood dark:text-cream font-medium py-2 px-4 rounded transition text-sm"
          >
            {showSteps ? 'Hide Steps' : 'View Steps'}
          </button>
          <button 
            onClick={handleEnhance}
            disabled={enhancing}
            className="flex-1 bg-beak/20 hover:bg-beak/30 dark:bg-beak/30 dark:hover:bg-beak/40 text-wood dark:text-cream font-medium py-2 px-4 rounded transition text-sm disabled:opacity-50"
          >
            {enhancing ? 'Enhancing...' : 'Enhance Recipe'}
          </button>
        </div>

        {showSteps && (
          <div className="mt-4 p-4 bg-cream/40 dark:bg-wood-light/20 rounded-lg space-y-2">
            <h4 className="font-semibold text-wood dark:text-cream">Cooking Steps:</h4>
            <ol className="list-decimal list-inside space-y-1 text-sm text-wood-light dark:text-cream-dark">
              {recipe.steps?.map((step: any) => (
                <li key={step.id}>{step.instruction}</li>
              ))}
              {(!recipe.steps || recipe.steps.length === 0) && (
                <p>No steps available.</p>
              )}
            </ol>
          </div>
        )}

        {enhancedText && (
          <div className="mt-4 p-4 bg-beak/10 rounded-lg text-sm text-wood dark:text-cream border border-beak/30">
            <h4 className="font-semibold mb-2">AI Suggestions:</h4>
            <div className="whitespace-pre-wrap">{enhancedText}</div>
          </div>
        )}
      </div>
    </div>
  );
}
