const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function runSearchAlgorithm(ingredients) {
  const searchTerms = ingredients.map((i) => i.toLowerCase().trim());
  const allRecipes = await prisma.recipes.findMany({
    include: {
      ingredients: { include: { ingredient: true } },
      category: true,
      steps: { orderBy: { step_number: 'asc' } },
    },
  });

  const matchedRecipes = [];
  for (const recipe of allRecipes) {
    const recipeIngredients = recipe.ingredients.map((ri) =>
      ri.ingredient.name.toLowerCase()
    );
    const total = recipeIngredients.length;
    if (total === 0) continue;
    let matchCount = 0;
    for (const recipeIng of recipeIngredients) {
      if (searchTerms.some((term) => recipeIng.includes(term))) matchCount++;
    }
    const matchPercentage = (matchCount / total) * 100;
    if (matchPercentage >= 80) {
      matchedRecipes.push({ name: recipe.name, matchPercentage });
    }
  }
  matchedRecipes.sort((a, b) => b.matchPercentage - a.matchPercentage);
  return matchedRecipes;
}

async function main() {
  const recipeCount = await prisma.recipes.count();
  const ingredientCount = await prisma.ingredients.count();
  console.log(`[db] recipes=${recipeCount} ingredients=${ingredientCount}`);

  if (recipeCount === 0) {
    console.error('[db] No recipes — run: npx prisma db seed');
    process.exitCode = 1;
    return;
  }

  const q1 = ['tomato', 'onion', 'garlic'];
  const matches1 = await runSearchAlgorithm(q1);
  console.log(`[search] ${q1.join(',')} -> matches=${matches1.length} (may be 0 with 80% rule)`);

  const q2 = ['tomato', 'onion', 'garlic', 'butter'];
  const matches2 = await runSearchAlgorithm(q2);
  console.log(`[search] ${q2.join(',')} -> matches=${matches2.length}`);
  for (const m of matches2.slice(0, 5)) {
    console.log(`  - ${m.name} (${m.matchPercentage.toFixed(0)}%)`);
  }

  const url = process.env.TEST_API_URL || 'http://127.0.0.1:3000/api/search';
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ingredients: q2 }),
    });
    const body = await res.json().catch(() => ({}));
    if (!res.ok) {
      console.error(`[http] POST ${url} -> ${res.status}`, body);
      process.exitCode = 1;
      return;
    }
    const n = Array.isArray(body.recipes) ? body.recipes.length : 0;
    console.log(`[http] POST /api/search -> ${res.status} recipes=${n}`);
  } catch (e) {
    console.warn(
      '[http] skipped (start dev server: npm run dev):',
      e.message || e
    );
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
