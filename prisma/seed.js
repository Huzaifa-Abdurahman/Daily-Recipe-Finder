const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding the database...');

  await prisma.aIEnhancements.deleteMany();
  await prisma.recipeIngredients.deleteMany();
  await prisma.cookingSteps.deleteMany();
  await prisma.recipes.deleteMany();
  await prisma.ingredients.deleteMany();
  await prisma.categories.deleteMany();
  await prisma.difficultyLevels.deleteMany();

  // Create Categories
  const catBreakfast = await prisma.categories.create({ data: { name: 'Breakfast' } });
  const catLunch = await prisma.categories.create({ data: { name: 'Lunch' } });
  const catDinner = await prisma.categories.create({ data: { name: 'Dinner' } });
  const catSnack = await prisma.categories.create({ data: { name: 'Snack' } });
  const catDessert = await prisma.categories.create({ data: { name: 'Dessert' } });

  // Create Difficulty Levels
  const diffEasy = await prisma.difficultyLevels.create({ data: { level: 'Easy' } });
  const diffMedium = await prisma.difficultyLevels.create({ data: { level: 'Medium' } });
  const diffHard = await prisma.difficultyLevels.create({ data: { level: 'Hard' } });

  // Food imagery only (verified HTTP 200): Unsplash + Spoonacular recipe thumbnails.
  const recipeImageUrls = [
    'https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=800&h=480&q=80',
    'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&h=480&q=80',
    'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=800&h=480&q=80',
    'https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&w=800&h=480&q=80',
    'https://images.unsplash.com/photo-1534939561126-855b8675edd7?auto=format&fit=crop&w=800&h=480&q=80',
    'https://images.unsplash.com/photo-1505253758473-96b7015fcd40?auto=format&fit=crop&w=800&h=480&q=80',
    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&h=480&q=80',
    'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&h=480&q=80',
    'https://images.unsplash.com/photo-1516100882582-96c3a05fe590?auto=format&fit=crop&w=800&h=480&q=80',
    'https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&w=800&h=480&q=80',
    'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=800&h=480&q=80',
    'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&w=800&h=480&q=80',
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&h=480&q=80',
    'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&h=480&q=80',
    'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&h=480&q=80',
    'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800&h=480&q=80',
    'https://images.unsplash.com/photo-1562007908-17c67e878c88?auto=format&fit=crop&w=800&h=480&q=80',
    'https://spoonacular.com/recipeImages/716408-556x370.jpg',
    'https://spoonacular.com/recipeImages/716409-556x370.jpg',
    'https://spoonacular.com/recipeImages/716410-556x370.jpg',
  ];

  // Array of 20 recipes to seed
  const recipesData = [
    { name: 'Omelette', desc: 'A classic breakfast omelette.', time: 10, cat: catBreakfast.id, diff: diffEasy.id, ingredients: [{name: 'egg', q: '3'}, {name: 'onion', q: '1/2 cup'}, {name: 'tomato', q: '1/2 cup'}] },
    { name: 'Tomato Soup', desc: 'Warm and comforting tomato soup.', time: 20, cat: catLunch.id, diff: diffEasy.id, ingredients: [{name: 'tomato', q: '4 large'}, {name: 'onion', q: '1'}, {name: 'garlic', q: '2 cloves'}, {name: 'butter', q: '1 tbsp'}] },
    { name: 'Garlic Butter Chicken', desc: 'Juicy chicken breasts with garlic butter.', time: 25, cat: catDinner.id, diff: diffMedium.id, ingredients: [{name: 'chicken', q: '2 breasts'}, {name: 'garlic', q: '4 cloves'}, {name: 'butter', q: '2 tbsp'}] },
    { name: 'Mushroom Risotto', desc: 'Creamy mushroom risotto.', time: 40, cat: catDinner.id, diff: diffHard.id, ingredients: [{name: 'rice', q: '1 cup'}, {name: 'mushroom', q: '2 cups'}, {name: 'onion', q: '1/2 cup'}, {name: 'butter', q: '2 tbsp'}] },
    { name: 'Beef Stew', desc: 'Hearty beef stew with vegetables.', time: 120, cat: catDinner.id, diff: diffMedium.id, ingredients: [{name: 'beef', q: '1 lb'}, {name: 'potato', q: '2'}, {name: 'carrot', q: '2'}, {name: 'onion', q: '1'}] },
    { name: 'Potato Salad', desc: 'Classic cold potato salad.', time: 30, cat: catLunch.id, diff: diffEasy.id, ingredients: [{name: 'potato', q: '4'}, {name: 'egg', q: '2'}, {name: 'mayo', q: '1/2 cup'}, {name: 'onion', q: '1/4 cup'}] },
    { name: 'Chicken Salad', desc: 'Fresh and light chicken salad.', time: 15, cat: catLunch.id, diff: diffEasy.id, ingredients: [{name: 'chicken', q: '1 cup cooked'}, {name: 'lettuce', q: '1 head'}, {name: 'tomato', q: '1'}, {name: 'onion', q: '1/4 cup'}] },
    { name: 'Fried Rice', desc: 'Simple egg and vegetable fried rice.', time: 20, cat: catLunch.id, diff: diffEasy.id, ingredients: [{name: 'rice', q: '2 cups cooked'}, {name: 'egg', q: '2'}, {name: 'carrot', q: '1'}, {name: 'onion', q: '1/2 cup'}] },
    { name: 'Pasta Pomodoro', desc: 'Classic Italian pasta with tomato sauce.', time: 25, cat: catDinner.id, diff: diffEasy.id, ingredients: [{name: 'pasta', q: '8 oz'}, {name: 'tomato', q: '4'}, {name: 'garlic', q: '2 cloves'}, {name: 'olive oil', q: '2 tbsp'}] },
    { name: 'Roasted Potatoes', desc: 'Crispy oven-roasted potatoes.', time: 45, cat: catSnack.id, diff: diffEasy.id, ingredients: [{name: 'potato', q: '4'}, {name: 'olive oil', q: '2 tbsp'}, {name: 'garlic', q: '1 clove'}, {name: 'salt', q: '1 tsp'}] },
    { name: 'Scrambled Eggs', desc: 'Fluffy scrambled eggs.', time: 5, cat: catBreakfast.id, diff: diffEasy.id, ingredients: [{name: 'egg', q: '3'}, {name: 'butter', q: '1 tbsp'}, {name: 'milk', q: '1 tbsp'}] },
    { name: 'French Toast', desc: 'Sweet breakfast treat.', time: 15, cat: catBreakfast.id, diff: diffMedium.id, ingredients: [{name: 'bread', q: '4 slices'}, {name: 'egg', q: '2'}, {name: 'milk', q: '1/2 cup'}, {name: 'sugar', q: '1 tbsp'}] },
    { name: 'Pancakes', desc: 'Fluffy homemade pancakes.', time: 20, cat: catBreakfast.id, diff: diffMedium.id, ingredients: [{name: 'flour', q: '1 cup'}, {name: 'milk', q: '1 cup'}, {name: 'egg', q: '1'}, {name: 'butter', q: '2 tbsp'}] },
    { name: 'Vegetable Stir Fry', desc: 'Quick and healthy veggie stir fry.', time: 15, cat: catDinner.id, diff: diffEasy.id, ingredients: [{name: 'carrot', q: '2'}, {name: 'broccoli', q: '1 head'}, {name: 'onion', q: '1'}, {name: 'soy sauce', q: '2 tbsp'}] },
    { name: 'Cheese Sandwich', desc: 'Grilled cheese sandwich.', time: 10, cat: catSnack.id, diff: diffEasy.id, ingredients: [{name: 'bread', q: '2 slices'}, {name: 'cheese', q: '2 slices'}, {name: 'butter', q: '1 tbsp'}] },
    { name: 'Chicken Noodle Soup', desc: 'Comforting chicken noodle soup.', time: 40, cat: catLunch.id, diff: diffMedium.id, ingredients: [{name: 'chicken', q: '1 breast'}, {name: 'pasta', q: '1 cup'}, {name: 'carrot', q: '1'}, {name: 'onion', q: '1'}] },
    { name: 'Apple Pie', desc: 'Classic homemade apple pie.', time: 60, cat: catDessert.id, diff: diffHard.id, ingredients: [{name: 'apple', q: '4'}, {name: 'flour', q: '2 cups'}, {name: 'sugar', q: '1 cup'}, {name: 'butter', q: '1/2 cup'}] },
    { name: 'Fruit Salad', desc: 'Fresh mixed fruit salad.', time: 10, cat: catDessert.id, diff: diffEasy.id, ingredients: [{name: 'apple', q: '1'}, {name: 'banana', q: '1'}, {name: 'grape', q: '1 cup'}] },
    { name: 'Banana Bread', desc: 'Moist and sweet banana bread.', time: 55, cat: catDessert.id, diff: diffMedium.id, ingredients: [{name: 'banana', q: '3'}, {name: 'flour', q: '1.5 cups'}, {name: 'sugar', q: '1/2 cup'}, {name: 'egg', q: '1'}] },
    { name: 'Mac and Cheese', desc: 'Creamy macaroni and cheese.', time: 25, cat: catLunch.id, diff: diffMedium.id, ingredients: [{name: 'pasta', q: '2 cups'}, {name: 'cheese', q: '1.5 cups'}, {name: 'milk', q: '1 cup'}, {name: 'butter', q: '2 tbsp'}] },
  ];

  for (let i = 0; i < recipesData.length; i++) {
    const item = recipesData[i];
    const imageUrl = recipeImageUrls[i];
    const createdRecipe = await prisma.recipes.create({
      data: {
        name: item.name,
        description: item.desc,
        cooking_time: item.time,
        category_id: item.cat,
        difficulty_id: item.diff,
        image_url: imageUrl,
        steps: {
          create: [
            { step_number: 1, instruction: `Prepare ingredients for ${item.name}.` },
            { step_number: 2, instruction: `Cook ingredients following standard procedures.` },
            { step_number: 3, instruction: `Serve and enjoy your ${item.name}!` }
          ]
        }
      }
    });

    for (const ing of item.ingredients) {
      // Find or create ingredient
      let dbIngredient = await prisma.ingredients.findFirst({
        where: { name: { equals: ing.name, mode: 'insensitive' } }
      });

      if (!dbIngredient) {
        dbIngredient = await prisma.ingredients.create({
          data: { name: ing.name }
        });
      }

      await prisma.recipeIngredients.create({
        data: {
          recipe_id: createdRecipe.id,
          ingredient_id: dbIngredient.id,
          quantity: ing.q
        }
      });
    }
  }

  console.log('Seeding completed! Added 20 recipes.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
