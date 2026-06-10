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
    <div className="bg-white dark:bg-[#3d2311] border border-cream dark:border-wood-light rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 card-hover">
      {/* Image container with overlay gradient */}
      <div className="relative overflow-hidden h-48">
        {(imgSrc || placeholderSrc) && (
          <img
            src={imgSrc || placeholderSrc}
            alt={recipe.name}
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
            onError={() => setImgSrc(placeholderSrc)}
          />
        )}
        {/* Match percentage badge */}
        <div className="absolute top-3 right-3 inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-parrot text-white shadow-lg">
          ✓ {Math.round(recipe.matchPercentage)}%
        </div>
        {/* Category badge */}
        {recipe.category?.name && (
          <div className="absolute top-3 left-3 inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-beak/90 text-white backdrop-blur-sm">
            {recipe.category.name}
          </div>
        )}
      </div>

      <div className="p-5 space-y-4">
        {/* Title */}
        <div className="flex justify-between items-start gap-3">
          <h3 className="text-xl font-bold text-wood dark:text-cream leading-tight">{recipe.name}</h3>
        </div>
        
        {/* Meta information */}
        <div className="text-sm text-wood-light dark:text-cream-dark flex items-center gap-4 flex-wrap">
          <span className="flex items-center gap-1">
            <span>⏱️</span>
            {recipe.cooking_time} mins
          </span>
        </div>

        {/* Description */}
        <p className="text-wood-light/90 dark:text-cream-dark/90 text-sm line-clamp-2">{recipe.description}</p>

        {/* Buttons section */}
        <div className="pt-4 flex gap-2 border-t border-cream dark:border-wood-light">
          <button 
            onClick={() => setShowSteps(!showSteps)}
            className="flex-1 bg-cream hover:bg-cream-dark dark:bg-wood-light dark:hover:bg-wood text-wood dark:text-cream font-medium py-2 px-3 rounded transition text-sm flex items-center justify-center gap-1 group"
          >
            <span className="group-hover:rotate-180 transition-transform duration-300">{showSteps ? '👁️‍🗨️' : '📖'}</span>
            {showSteps ? 'Hide' : 'Steps'}
          </button>
          <button 
            onClick={handleEnhance}
            disabled={enhancing}
            className="flex-1 bg-beak/20 hover:bg-beak/30 dark:bg-beak/30 dark:hover:bg-beak/40 text-wood dark:text-cream font-medium py-2 px-3 rounded transition text-sm disabled:opacity-50 flex items-center justify-center gap-1 group"
          >
            <span className="group-hover:animate-bounce">{enhancing ? '⚙️' : '✨'}</span>
            {enhancing ? 'Enhancing...' : 'Enhance'}
          </button>
        </div>

        {/* Steps section */}
        {showSteps && (
          <div className="mt-4 p-4 bg-cream/40 dark:bg-wood-light/20 rounded-lg space-y-2 border-l-4 border-parrot">
            <h4 className="font-semibold text-wood dark:text-cream flex items-center gap-2">
              <span>🍳</span>
              Cooking Steps
            </h4>
            <ol className="list-decimal list-inside space-y-2 text-sm text-wood-light dark:text-cream-dark">
              {recipe.steps?.map((step: any) => (
                <li key={step.id} className="ml-2">{step.instruction}</li>
              ))}
              {(!recipe.steps || recipe.steps.length === 0) && (
                <p>No steps available.</p>
              )}
            </ol>
          </div>
        )}

        {/* AI Enhancements */}
        {enhancedText && (
          <div className="mt-4 p-4 bg-beak/10 rounded-lg text-sm text-wood dark:text-cream border border-beak/30 space-y-2">
            <h4 className="font-semibold flex items-center gap-2">
              <span>🤖</span>
              Chef's AI Suggestions
            </h4>
            <div className="whitespace-pre-wrap text-xs opacity-90">{enhancedText}</div>
          </div>
        )}
      </div>
    </div>
  );
}
