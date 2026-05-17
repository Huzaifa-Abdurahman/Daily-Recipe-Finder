import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { ingredients } = await request.json();

    if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
      return NextResponse.json({ error: 'Please provide an array of ingredients' }, { status: 400 });
    }

    const searchTerms = ingredients.map((i: string) => i.toLowerCase().trim());

    // Fetch all recipes from PostgreSQL
    const allRecipes = await prisma.recipes.findMany({
      include: {
        ingredients: {
          include: {
            ingredient: true
          }
        },
        category: true,
        steps: {
          orderBy: {
            step_number: 'asc'
          }
        }
      }
    });

    const matchedRecipes = [];

    // Simple matching algorithm (Beginner friendly)
    for (const recipe of allRecipes) {
      const recipeIngredients = recipe.ingredients.map(
        (ri: (typeof recipe.ingredients)[number]) => ri.ingredient.name.toLowerCase()
      );
      const totalIngredients = recipeIngredients.length;

      if (totalIngredients === 0) continue;

      let matchCount = 0;
      for (const recipeIng of recipeIngredients) {
        // Match user ingredient with recipe ingredient
        const isMatch = searchTerms.some(term => recipeIng.includes(term));
        if (isMatch) {
          matchCount++;
        }
      }

      // Calculate percentage
      const matchPercentage = (matchCount / totalIngredients) * 100;

      // Only return recipes with >= 80% match
      if (matchPercentage >= 80) {
        matchedRecipes.push({
          ...recipe,
          matchPercentage
        });
      }
    }

    matchedRecipes.sort((a, b) => b.matchPercentage - a.matchPercentage);

    return NextResponse.json({ recipes: matchedRecipes });
  } catch (error) {
    console.error('Error searching recipes:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
