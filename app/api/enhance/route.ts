import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'dummy_key',
});

export async function POST(request: Request) {
  try {
    const { recipeId } = await request.json();

    if (!recipeId) {
      return NextResponse.json({ error: 'Recipe ID is required' }, { status: 400 });
    }

    // Check if we already have an enhancement saved
    const existingEnhancement = await prisma.aIEnhancements.findFirst({
      where: { recipe_id: recipeId },
      orderBy: { generated_at: 'desc' }
    });

    if (existingEnhancement) {
      return NextResponse.json({ enhancement: existingEnhancement.enhancement_text });
    }

    const recipe = await prisma.recipes.findUnique({
      where: { id: recipeId },
      include: {
        ingredients: {
          include: { ingredient: true }
        },
        steps: {
          orderBy: { step_number: 'asc' }
        }
      }
    });

    if (!recipe) {
      return NextResponse.json({ error: 'Recipe not found' }, { status: 404 });
    }

    const ingredientList = recipe.ingredients
      .map((ri: (typeof recipe.ingredients)[number]) => ri.ingredient.name)
      .join(', ');
    const stepsList = recipe.steps
      .map((s: (typeof recipe.steps)[number]) => `${s.step_number}. ${s.instruction}`)
      .join('\n');

    const prompt = `
      You are an expert chef. Please enhance the following recipe:
      Name: ${recipe.name}
      Description: ${recipe.description}
      Ingredients: ${ingredientList}
      Steps:
      ${stepsList}

      Please provide:
      1. A short, improved description.
      2. Suggestions for extra ingredients that would make it better.
      3. 2-3 professional cooking tips for this specific recipe.
      Keep the response simple and beginner-friendly.
    `;

    let enhancementText = "";
    
    // Check if the user has provided a real API key in the .env file
    if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'dummy_key') {
      const completion = await openai.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "gpt-3.5-turbo",
      });
      enhancementText = completion.choices[0].message.content || 'Failed to generate enhancement.';
    } else {
      // Dummy response for student testing if they don't have an API key
      enhancementText = `(Demo AI Output - No API Key Provided in .env)\n\nImproved Description: A rich and hearty ${recipe.name} that is perfect for any occasion.\n\nExtra Ingredients: Try adding a dash of smoked paprika or fresh parsley for garnish.\n\nTips:\n- Always taste and adjust seasoning before serving.\n- Cook on medium heat to avoid burning the spices.`;
    }

    // Save to the PostgreSQL database using Prisma
    await prisma.aIEnhancements.create({
      data: {
        recipe_id: recipeId,
        enhancement_text: enhancementText
      }
    });

    return NextResponse.json({ enhancement: enhancementText });
  } catch (error) {
    console.error('Error enhancing recipe:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
