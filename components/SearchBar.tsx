"use client";

import { useState } from 'react';
import RecipeCard from './RecipeCard';

export default function SearchBar() {
  const [ingredients, setIngredients] = useState('');
  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ingredients.trim()) {
      setError('Please enter some ingredients.');
      return;
    }
    setError('');
    setLoading(true);
    setHasSearched(true);

    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ingredients: ingredients.split(',').map(i => i.trim()) })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch recipes');
      }

      const data = await response.json();
      setRecipes(data.recipes);
    } catch (err) {
      setError('Error searching for recipes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleSearch} className="space-y-5">
        <div>
          <label htmlFor="ingredients" className="block text-sm font-semibold text-wood dark:text-cream mb-3 flex items-center gap-2">
            <span>🥕</span> Available Ingredients
          </label>
          <div className="relative">
            <input
              id="ingredients"
              type="text"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              placeholder="e.g. egg, onion, tomato, garlic..."
              className="w-full px-5 py-4 border-2 border-cream-dark dark:border-wood-light rounded-xl focus:ring-2 focus:ring-parrot focus:border-parrot outline-none transition bg-white dark:bg-[#3d2311] text-wood dark:text-cream placeholder:text-wood-light/50 dark:placeholder:text-cream-dark/50 shadow-sm hover:border-cream dark:hover:border-wood"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl opacity-30">
              🔍
            </span>
          </div>
          <p className="text-xs text-wood-light dark:text-cream-dark mt-2 flex items-center gap-1">
            💡 Tip: Use common ingredients for better matches!
          </p>
        </div>

        {/* Submit Button with enhanced styling */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-parrot to-parrot-hover hover:from-parrot-hover hover:to-parrot text-white font-bold py-4 px-6 rounded-xl transition transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl flex items-center justify-center gap-2 text-lg"
        >
          <span className="text-xl">{loading ? '⏳' : '🍽️'}</span>
          {loading ? 'Searching for delicious recipes...' : 'Find Recipes'}
        </button>
      </form>

      {/* Error message with enhanced styling */}
      {error && (
        <div className="p-5 bg-tie/15 dark:bg-tie/10 text-tie dark:text-tie rounded-xl border-2 border-tie/30 font-semibold flex items-start gap-3 animate-pulse">
          <span className="text-2xl flex-shrink-0">⚠️</span>
          <span>{error}</span>
        </div>
      )}

      {/* No results message */}
      {hasSearched && !loading && recipes.length === 0 && !error && (
        <div className="text-center p-8 text-wood-light dark:text-cream-dark bg-gradient-to-br from-cream/40 to-cream/20 dark:from-wood-light/20 dark:to-wood-light/10 rounded-xl border-2 border-dashed border-cream-dark dark:border-wood-light/40 space-y-4">
          <div className="text-5xl">🔍</div>
          <div>
            <h3 className="font-bold text-lg mb-2 text-wood dark:text-cream">No recipes found</h3>
            <p className="text-sm opacity-80">
              We couldn't find recipes with 80%+ ingredient match. Try different ingredients or check out our entire recipe collection!
            </p>
          </div>
        </div>
      )}

      {/* Recipes Grid with enhanced styling */}
      {recipes.length > 0 && (
        <div className="space-y-8">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🎉</span>
              <h2 className="text-3xl font-bold text-wood dark:text-cream">
                Found <span className="text-parrot">{recipes.length}</span> Delicious Recipe{recipes.length !== 1 ? 's' : ''}
              </h2>
            </div>
            <div className="h-1 w-48 bg-gradient-to-r from-parrot to-beak rounded-full opacity-40"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-max">
            {recipes.map((recipe, index) => (
              <div key={recipe.id} className="animate-in fade-in slide-in-from-bottom-4" style={{ animationDelay: `${index * 100}ms` }}>
                <RecipeCard recipe={recipe} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
