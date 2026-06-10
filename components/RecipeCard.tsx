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

  const matchPercentage = Math.round(recipe.matchPercentage);
  const matchLevel = matchPercentage >= 95 ? '🌟 Perfect' : matchPercentage >= 80 ? '✨ Excellent' : 'Good';

  return (
    <div className="recipe-card bg-white dark:bg-[#3d2311] border-2 border-cream dark:border-wood-light rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group">
      {/* Recipe Image Container */}
      <div className="relative overflow-hidden bg-gradient-to-br from-cream to-cream-dark dark:from-[#2b1a0e] dark:to-[#3d2311] h-56">
        <img
          src={imgSrc || placeholderSrc}
          alt={recipe.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={() => setImgSrc(placeholderSrc)}
        />
        
        {/* Match Percentage Badge */}
        <div className="absolute top-4 right-4">
          <div className="match-badge px-4 py-2 rounded-full text-white text-sm font-bold shadow-lg backdrop-blur-sm">
            <div className="flex items-center gap-1">
              <span>{matchLevel}</span>
              <span className="text-base">{matchPercentage}%</span>
            </div>
          </div>
        </div>

        {/* Category Badge */}
        {recipe.category?.name && (
          <div className="absolute top-4 left-4">
            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold bg-beak/90 text-white shadow-lg">
              📂 {recipe.category.name}
            </span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-6 space-y-5">
        {/* Recipe Title */}
        <div>
          <h3 className="text-2xl font-bold text-wood dark:text-cream mb-2 group-hover:text-parrot transition-colors">
            {recipe.name}
          </h3>
        </div>

        {/* Quick Info */}
        <div className="flex items-center gap-6 text-sm font-semibold text-wood-light dark:text-cream-dark border-b border-cream/40 dark:border-wood-light/40 pb-4">
          <span className="flex items-center gap-2 bg-parrot/10 px-3 py-1.5 rounded-full text-parrot">
            ⏱️ {recipe.cooking_time} mins
          </span>
          <span className="flex items-center gap-2 bg-beak/10 px-3 py-1.5 rounded-full text-beak">
            👨‍🍳 {recipe.serving_size || '4'} servings
          </span>
        </div>

        {/* Description */}
        <p className="text-wood-light dark:text-cream-dark/90 text-sm leading-relaxed line-clamp-2 hover:line-clamp-none transition-all">
          {recipe.description || 'A delicious recipe waiting to be discovered!'}
        </p>

        {/* Ingredients Count (if available) */}
        {recipe.ingredients && recipe.ingredients.length > 0 && (
          <div className="bg-cream/30 dark:bg-wood-light/20 rounded-lg p-3">
            <p className="text-xs font-semibold text-wood dark:text-cream mb-2">
              📋 Ingredients ({recipe.ingredients.length})
            </p>
            <div className="flex flex-wrap gap-2">
              {recipe.ingredients.slice(0, 4).map((ing: any, idx: number) => (
                <span key={idx} className="text-xs bg-white dark:bg-[#3d2311] px-2 py-1 rounded text-wood dark:text-cream border border-cream-dark dark:border-wood-light/40">
                  {ing.name || ing}
                </span>
              ))}
              {recipe.ingredients.length > 4 && (
                <span className="text-xs bg-white dark:bg-[#3d2311] px-2 py-1 rounded text-wood-light dark:text-cream-dark italic">
                  +{recipe.ingredients.length - 4} more...
                </span>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="pt-2 flex gap-3 flex-col sm:flex-row">
          <button 
            onClick={() => setShowSteps(!showSteps)}
            className="flex-1 bg-gradient-to-r from-cream to-cream-dark dark:from-wood-light dark:to-wood hover:from-cream-dark hover:to-beak/20 dark:hover:from-wood dark:hover:to-wood-light text-wood dark:text-cream font-bold py-3 px-4 rounded-lg transition transform hover:scale-105 active:scale-95 text-sm shadow-md flex items-center justify-center gap-2"
          >
            <span>{showSteps ? '▼' : '▶'}</span>
            {showSteps ? 'Hide Steps' : 'View Steps'}
          </button>
          <button 
            onClick={handleEnhance}
            disabled={enhancing}
            className="flex-1 bg-gradient-to-r from-beak/20 to-beak/30 hover:from-beak/40 hover:to-beak/50 dark:from-beak/30 dark:to-beak/40 dark:hover:from-beak/50 dark:hover:to-beak/60 text-wood dark:text-cream font-bold py-3 px-4 rounded-lg transition transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed text-sm shadow-md flex items-center justify-center gap-2"
          >
            <span>{enhancing ? '⏳' : '✨'}</span>
            {enhancing ? 'Enhancing...' : 'Enhance Recipe'}
          </button>
        </div>

        {/* Cooking Steps Section */}
        {showSteps && (
          <div className="mt-6 p-5 bg-gradient-to-br from-cream/40 to-cream/20 dark:from-wood-light/25 dark:to-wood-light/10 rounded-xl space-y-4 border border-cream-dark/30 dark:border-wood-light/30 animate-in fade-in slide-in-from-top-2">
            <h4 className="font-bold text-wood dark:text-cream text-lg flex items-center gap-2">
              👨‍🍳 Cooking Steps
            </h4>
            <ol className="space-y-3">
              {recipe.steps && recipe.steps.length > 0 ? (
                recipe.steps.map((step: any, idx: number) => (
                  <li key={step.id} className="flex gap-4 text-sm text-wood-light dark:text-cream-dark">
                    <span className="font-bold text-parrot flex-shrink-0 bg-parrot/20 w-7 h-7 rounded-full flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <span className="pt-0.5">{step.instruction}</span>
                  </li>
                ))
              ) : (
                <p className="text-wood-light dark:text-cream-dark/60 italic">No detailed steps available for this recipe.</p>
              )}
            </ol>
          </div>
        )}

        {/* AI Enhancement Section */}
        {enhancedText && (
          <div className="mt-6 p-5 bg-gradient-to-br from-beak/15 to-beak/5 rounded-xl text-sm text-wood dark:text-cream border-2 border-beak/30 space-y-3 animate-in fade-in slide-in-from-bottom-2">
            <h4 className="font-bold flex items-center gap-2 text-wood dark:text-cream">
              🤖 AI Suggestions
            </h4>
            <div className="whitespace-pre-wrap text-wood-light dark:text-cream-dark/90 leading-relaxed">
              {enhancedText}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
