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
      <form onSubmit={handleSearch} className="space-y-4">
        <div>
          <label htmlFor="ingredients" className="block text-sm font-medium text-wood dark:text-cream mb-2">
            Available Ingredients
          </label>
          <input
            id="ingredients"
            type="text"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="e.g. egg, onion, tomato"
            className="w-full px-4 py-3 border border-cream-dark dark:border-wood-light rounded-lg focus:ring-2 focus:ring-parrot focus:border-parrot outline-none transition bg-white dark:bg-[#3d2311] text-wood dark:text-cream placeholder-wood-light/60 dark:placeholder-cream-dark/60"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-parrot hover:bg-parrot-hover text-white font-semibold py-3 px-6 rounded-lg transition disabled:opacity-50 shadow-md"
        >
          {loading ? 'Searching...' : 'Find Recipes'}
        </button>
      </form>

      {error && (
        <div className="p-4 bg-tie/10 text-tie rounded-lg border border-tie/20 font-medium">
          {error}
        </div>
      )}

      {hasSearched && !loading && recipes.length === 0 && !error && (
        <div className="text-center p-8 text-wood-light dark:text-cream-dark bg-cream/30 dark:bg-wood-light/10 rounded-lg border border-dashed border-cream-dark dark:border-wood-light">
          No recipes found with 80% or more ingredient match. Try different ingredients!
        </div>
      )}

      {recipes.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-wood dark:text-cream border-b border-cream dark:border-wood-light pb-2">Matching Recipes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
