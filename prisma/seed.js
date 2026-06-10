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
    'https://images.unsplash.com/photo-1625943553852-781c6dd46faa?auto=format&fit=crop&w=800&h=480&q=80',  // Shrimp Scampi
    'https://images.unsplash.com/photo-1547592180-85c173f879d2?auto=format&fit=crop&w=800&h=480&q=80',  // Lentil Soup
    'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&w=800&h=480&q=80',  // Zucchini Bread
    'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=800&h=480&q=80',  // Chicken Marsala
    'https://images.unsplash.com/photo-1592417817098-8fd3d4c8bd94?auto=format&fit=crop&w=800&h=480&q=80',  // Caprese Salad
    'https://images.unsplash.com/photo-1547592166-23ac457c016d?auto=format&fit=crop&w=800&h=480&q=80',  // Butternut Squash Soup
    'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=800&h=480&q=80',  // Pesto Pasta
    'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=800&h=480&q=80',  // Eggplant Rollatini
    'https://images.unsplash.com/photo-1600967361966-dab40ccf3f7a?auto=format&fit=crop&w=800&h=480&q=80',  // Guacamole
    'https://images.unsplash.com/photo-1547592180-85c173f879d2?auto=format&fit=crop&w=800&h=480&q=80',  // Clam Chowder
    'https://images.unsplash.com/photo-1559314809-0d155014e29e?auto=format&fit=crop&w=800&h=480&q=80',  // Pad Thai
    'https://images.unsplash.com/photo-1615325972504-6dd8c55dfab6?auto=format&fit=crop&w=800&h=480&q=80',  // Stuffed Mushrooms
    'https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&w=800&h=480&q=80',  // Risotto alla Milanese
    'https://images.unsplash.com/photo-1590412200988-a436970781fa?auto=format&fit=crop&w=800&h=480&q=80',  // Pico de Gallo
    'https://images.unsplash.com/photo-1534082153518-8e5e6efb9ddc?auto=format&fit=crop&w=800&h=480&q=80',  // Cioppino
    'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?auto=format&fit=crop&w=800&h=480&q=80',  // Bruschetta
    'https://images.unsplash.com/photo-1546961329-78bef0414d7c?auto=format&fit=crop&w=800&h=480&q=80',  // Beef Wellington
    'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&w=800&h=480&q=80',  // Quiche Lorraine
    'https://images.unsplash.com/photo-1565971648911-117eb7b142a5?auto=format&fit=crop&w=800&h=480&q=80',  // Creme Brulee
    'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=800&h=480&q=80',  // Tiramisu

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
    { name: 'Chicken Alfredo Pasta', desc: 'Creamy Alfredo pasta with grilled chicken.', time: 30, cat: catDinner.id, diff: diffMedium.id, ingredients: [{name: 'pasta', q: '2 cups'}, {name: 'chicken', q: '1 cup'}, {name: 'cream', q: '1 cup'}, {name: 'parmesan', q: '1/2 cup'}] },

{ name: 'Beef Burger', desc: 'Juicy homemade beef burger.', time: 25, cat: catLunch.id, diff: diffMedium.id, ingredients: [{name: 'beef', q: '1 patty'}, {name: 'bun', q: '1'}, {name: 'lettuce', q: '2 leaves'}, {name: 'cheese', q: '1 slice'}] },

{ name: 'Veggie Burger', desc: 'Healthy vegetable burger.', time: 20, cat: catLunch.id, diff: diffEasy.id, ingredients: [{name: 'potato', q: '2'}, {name: 'carrot', q: '1'}, {name: 'bun', q: '1'}, {name: 'lettuce', q: '2 leaves'}] },

{ name: 'Chicken Wrap', desc: 'Grilled chicken tortilla wrap.', time: 15, cat: catSnack.id, diff: diffEasy.id, ingredients: [{name: 'chicken', q: '1 cup'}, {name: 'tortilla', q: '1'}, {name: 'lettuce', q: '1/2 cup'}, {name: 'mayo', q: '2 tbsp'}] },

{ name: 'Tuna Salad', desc: 'Light and healthy tuna salad.', time: 10, cat: catLunch.id, diff: diffEasy.id, ingredients: [{name: 'tuna', q: '1 can'}, {name: 'lettuce', q: '2 cups'}, {name: 'tomato', q: '1'}, {name: 'cucumber', q: '1'}] },

{ name: 'Greek Salad', desc: 'Fresh Greek salad with feta.', time: 10, cat: catLunch.id, diff: diffEasy.id, ingredients: [{name: 'cucumber', q: '1'}, {name: 'tomato', q: '2'}, {name: 'feta cheese', q: '1/2 cup'}, {name: 'olive oil', q: '1 tbsp'}] },

{ name: 'Caesar Salad', desc: 'Classic Caesar salad.', time: 15, cat: catLunch.id, diff: diffEasy.id, ingredients: [{name: 'lettuce', q: '1 head'}, {name: 'croutons', q: '1 cup'}, {name: 'parmesan', q: '1/4 cup'}, {name: 'caesar dressing', q: '3 tbsp'}] },

{ name: 'Chicken Curry', desc: 'Traditional chicken curry.', time: 45, cat: catDinner.id, diff: diffMedium.id, ingredients: [{name: 'chicken', q: '1 lb'}, {name: 'onion', q: '2'}, {name: 'tomato', q: '2'}, {name: 'spices', q: '2 tbsp'}] },

{ name: 'Beef Curry', desc: 'Rich beef curry.', time: 60, cat: catDinner.id, diff: diffHard.id, ingredients: [{name: 'beef', q: '1 lb'}, {name: 'onion', q: '2'}, {name: 'garlic', q: '4 cloves'}, {name: 'spices', q: '2 tbsp'}] },

{ name: 'Vegetable Curry', desc: 'Mixed vegetable curry.', time: 35, cat: catDinner.id, diff: diffEasy.id, ingredients: [{name: 'potato', q: '2'}, {name: 'carrot', q: '2'}, {name: 'peas', q: '1 cup'}, {name: 'spices', q: '1 tbsp'}] },

{ name: 'Chicken Biryani', desc: 'Flavorful chicken biryani.', time: 60, cat: catDinner.id, diff: diffHard.id, ingredients: [{name: 'rice', q: '2 cups'}, {name: 'chicken', q: '1 lb'}, {name: 'yogurt', q: '1/2 cup'}, {name: 'spices', q: '2 tbsp'}] },

{ name: 'Beef Biryani', desc: 'Traditional beef biryani.', time: 75, cat: catDinner.id, diff: diffHard.id, ingredients: [{name: 'rice', q: '2 cups'}, {name: 'beef', q: '1 lb'}, {name: 'onion', q: '2'}, {name: 'spices', q: '2 tbsp'}] },

{ name: 'Lemon Rice', desc: 'Tangy lemon-flavored rice.', time: 20, cat: catLunch.id, diff: diffEasy.id, ingredients: [{name: 'rice', q: '2 cups'}, {name: 'lemon', q: '1'}, {name: 'mustard seeds', q: '1 tsp'}, {name: 'oil', q: '1 tbsp'}] },

{ name: 'Egg Fried Rice', desc: 'Quick egg fried rice.', time: 20, cat: catLunch.id, diff: diffEasy.id, ingredients: [{name: 'rice', q: '2 cups'}, {name: 'egg', q: '2'}, {name: 'soy sauce', q: '2 tbsp'}, {name: 'carrot', q: '1'}] },

{ name: 'Vegetable Fried Rice', desc: 'Mixed vegetable fried rice.', time: 20, cat: catLunch.id, diff: diffEasy.id, ingredients: [{name: 'rice', q: '2 cups'}, {name: 'carrot', q: '1'}, {name: 'peas', q: '1/2 cup'}, {name: 'soy sauce', q: '2 tbsp'}] },

{ name: 'Spaghetti Bolognese', desc: 'Classic meat spaghetti.', time: 40, cat: catDinner.id, diff: diffMedium.id, ingredients: [{name: 'spaghetti', q: '8 oz'}, {name: 'beef', q: '1 cup'}, {name: 'tomato sauce', q: '1 cup'}, {name: 'garlic', q: '2 cloves'}] },

{ name: 'Vegetable Lasagna', desc: 'Layered vegetable lasagna.', time: 55, cat: catDinner.id, diff: diffHard.id, ingredients: [{name: 'lasagna sheets', q: '10'}, {name: 'cheese', q: '2 cups'}, {name: 'tomato sauce', q: '2 cups'}, {name: 'spinach', q: '2 cups'}] },

{ name: 'Cheese Pizza', desc: 'Classic cheese pizza.', time: 35, cat: catDinner.id, diff: diffMedium.id, ingredients: [{name: 'pizza dough', q: '1'}, {name: 'cheese', q: '2 cups'}, {name: 'tomato sauce', q: '1 cup'}] },

{ name: 'Pepperoni Pizza', desc: 'Pizza topped with pepperoni.', time: 35, cat: catDinner.id, diff: diffMedium.id, ingredients: [{name: 'pizza dough', q: '1'}, {name: 'pepperoni', q: '20 slices'}, {name: 'cheese', q: '2 cups'}] },

{ name: 'Vegetable Pizza', desc: 'Pizza loaded with vegetables.', time: 35, cat: catDinner.id, diff: diffMedium.id, ingredients: [{name: 'pizza dough', q: '1'}, {name: 'capsicum', q: '1'}, {name: 'onion', q: '1'}, {name: 'cheese', q: '2 cups'}] },

{ name: 'Chicken Pizza', desc: 'Chicken topped pizza.', time: 40, cat: catDinner.id, diff: diffMedium.id, ingredients: [{name: 'pizza dough', q: '1'}, {name: 'chicken', q: '1 cup'}, {name: 'cheese', q: '2 cups'}, {name: 'sauce', q: '1 cup'}] },

{ name: 'French Fries', desc: 'Crispy homemade fries.', time: 25, cat: catSnack.id, diff: diffEasy.id, ingredients: [{name: 'potato', q: '4'}, {name: 'oil', q: '2 cups'}, {name: 'salt', q: '1 tsp'}] },

{ name: 'Loaded Nachos', desc: 'Cheesy loaded nachos.', time: 15, cat: catSnack.id, diff: diffEasy.id, ingredients: [{name: 'nachos', q: '2 cups'}, {name: 'cheese', q: '1 cup'}, {name: 'jalapeno', q: '1/4 cup'}, {name: 'salsa', q: '1/2 cup'}] },

{ name: 'Chicken Quesadilla', desc: 'Cheesy chicken quesadilla.', time: 20, cat: catLunch.id, diff: diffEasy.id, ingredients: [{name: 'tortilla', q: '2'}, {name: 'chicken', q: '1 cup'}, {name: 'cheese', q: '1 cup'}] },

{ name: 'Beef Tacos', desc: 'Mexican-style beef tacos.', time: 25, cat: catDinner.id, diff: diffMedium.id, ingredients: [{name: 'taco shells', q: '4'}, {name: 'beef', q: '1 cup'}, {name: 'lettuce', q: '1/2 cup'}, {name: 'cheese', q: '1/2 cup'}] },
{ name: 'Chicken Tacos', desc: 'Flavorful chicken tacos.', time: 20, cat: catDinner.id, diff: diffEasy.id, ingredients: [{name: 'taco shells', q: '4'}, {name: 'chicken', q: '1 cup'}, {name: 'lettuce', q: '1/2 cup'}, {name: 'cheese', q: '1/2 cup'}] },

{ name: 'Fish Tacos', desc: 'Crispy fish tacos with vegetables.', time: 25, cat: catDinner.id, diff: diffMedium.id, ingredients: [{name: 'fish', q: '1 lb'}, {name: 'taco shells', q: '4'}, {name: 'cabbage', q: '1 cup'}, {name: 'lime', q: '1'}] },

{ name: 'Chicken Shawarma', desc: 'Middle Eastern chicken shawarma.', time: 35, cat: catDinner.id, diff: diffMedium.id, ingredients: [{name: 'chicken', q: '1 lb'}, {name: 'pita bread', q: '4'}, {name: 'garlic sauce', q: '1/2 cup'}, {name: 'lettuce', q: '1 cup'}] },

{ name: 'Beef Shawarma', desc: 'Tender beef shawarma wrap.', time: 40, cat: catDinner.id, diff: diffMedium.id, ingredients: [{name: 'beef', q: '1 lb'}, {name: 'pita bread', q: '4'}, {name: 'garlic sauce', q: '1/2 cup'}, {name: 'tomato', q: '2'}] },

{ name: 'Hummus Bowl', desc: 'Creamy hummus served with vegetables.', time: 15, cat: catSnack.id, diff: diffEasy.id, ingredients: [{name: 'chickpeas', q: '2 cups'}, {name: 'tahini', q: '2 tbsp'}, {name: 'olive oil', q: '1 tbsp'}, {name: 'lemon', q: '1'}] },

{ name: 'Falafel Wrap', desc: 'Falafel wrapped in pita bread.', time: 30, cat: catLunch.id, diff: diffMedium.id, ingredients: [{name: 'falafel', q: '6 pieces'}, {name: 'pita bread', q: '2'}, {name: 'lettuce', q: '1 cup'}, {name: 'tahini sauce', q: '3 tbsp'}] },

{ name: 'Grilled Cheese Sandwich', desc: 'Golden grilled cheese sandwich.', time: 10, cat: catSnack.id, diff: diffEasy.id, ingredients: [{name: 'bread', q: '2 slices'}, {name: 'cheese', q: '2 slices'}, {name: 'butter', q: '1 tbsp'}] },

{ name: 'Club Sandwich', desc: 'Triple-layer club sandwich.', time: 15, cat: catLunch.id, diff: diffEasy.id, ingredients: [{name: 'bread', q: '3 slices'}, {name: 'chicken', q: '1/2 cup'}, {name: 'lettuce', q: '2 leaves'}, {name: 'mayo', q: '2 tbsp'}] },

{ name: 'Chicken Nuggets', desc: 'Crispy homemade chicken nuggets.', time: 25, cat: catSnack.id, diff: diffEasy.id, ingredients: [{name: 'chicken', q: '1 lb'}, {name: 'breadcrumbs', q: '1 cup'}, {name: 'egg', q: '1'}, {name: 'oil', q: '2 cups'}] },

{ name: 'Mozzarella Sticks', desc: 'Cheesy fried mozzarella sticks.', time: 20, cat: catSnack.id, diff: diffEasy.id, ingredients: [{name: 'mozzarella', q: '8 sticks'}, {name: 'breadcrumbs', q: '1 cup'}, {name: 'egg', q: '1'}] },

{ name: 'Onion Rings', desc: 'Crispy battered onion rings.', time: 20, cat: catSnack.id, diff: diffEasy.id, ingredients: [{name: 'onion', q: '2'}, {name: 'flour', q: '1 cup'}, {name: 'oil', q: '2 cups'}] },

{ name: 'Mashed Potatoes', desc: 'Creamy mashed potatoes.', time: 25, cat: catDinner.id, diff: diffEasy.id, ingredients: [{name: 'potato', q: '4'}, {name: 'milk', q: '1/2 cup'}, {name: 'butter', q: '2 tbsp'}] },

{ name: 'Baked Potato', desc: 'Oven baked potato.', time: 50, cat: catSnack.id, diff: diffEasy.id, ingredients: [{name: 'potato', q: '2'}, {name: 'butter', q: '1 tbsp'}, {name: 'cheese', q: '1/4 cup'}] },

{ name: 'Stuffed Bell Peppers', desc: 'Bell peppers stuffed with rice.', time: 45, cat: catDinner.id, diff: diffMedium.id, ingredients: [{name: 'bell pepper', q: '4'}, {name: 'rice', q: '2 cups'}, {name: 'cheese', q: '1 cup'}] },

{ name: 'Vegetable Soup', desc: 'Healthy mixed vegetable soup.', time: 30, cat: catLunch.id, diff: diffEasy.id, ingredients: [{name: 'carrot', q: '2'}, {name: 'potato', q: '2'}, {name: 'peas', q: '1 cup'}, {name: 'onion', q: '1'}] },

{ name: 'Minestrone Soup', desc: 'Italian vegetable soup.', time: 40, cat: catLunch.id, diff: diffMedium.id, ingredients: [{name: 'pasta', q: '1 cup'}, {name: 'beans', q: '1 cup'}, {name: 'tomato', q: '2'}, {name: 'carrot', q: '1'}] },

{ name: 'Corn Chowder', desc: 'Creamy corn chowder.', time: 35, cat: catLunch.id, diff: diffMedium.id, ingredients: [{name: 'corn', q: '2 cups'}, {name: 'milk', q: '1 cup'}, {name: 'potato', q: '2'}] },

{ name: 'Pumpkin Soup', desc: 'Smooth pumpkin soup.', time: 35, cat: catLunch.id, diff: diffEasy.id, ingredients: [{name: 'pumpkin', q: '2 cups'}, {name: 'onion', q: '1'}, {name: 'cream', q: '1/2 cup'}] },

{ name: 'Chicken Pot Pie', desc: 'Comforting chicken pot pie.', time: 60, cat: catDinner.id, diff: diffHard.id, ingredients: [{name: 'chicken', q: '1 cup'}, {name: 'pie crust', q: '1'}, {name: 'peas', q: '1/2 cup'}, {name: 'carrot', q: '1'}] },

{ name: 'Shepherds Pie', desc: 'Classic meat and potato pie.', time: 55, cat: catDinner.id, diff: diffMedium.id, ingredients: [{name: 'beef', q: '1 lb'}, {name: 'potato', q: '4'}, {name: 'peas', q: '1 cup'}] },

{ name: 'Beef Stew Deluxe', desc: 'Rich beef stew with vegetables.', time: 120, cat: catDinner.id, diff: diffMedium.id, ingredients: [{name: 'beef', q: '1 lb'}, {name: 'potato', q: '3'}, {name: 'carrot', q: '2'}, {name: 'onion', q: '1'}] },

{ name: 'Chicken Stir Fry', desc: 'Quick chicken stir fry.', time: 20, cat: catDinner.id, diff: diffEasy.id, ingredients: [{name: 'chicken', q: '1 lb'}, {name: 'broccoli', q: '1 cup'}, {name: 'carrot', q: '1'}, {name: 'soy sauce', q: '2 tbsp'}] },

{ name: 'Beef Stir Fry', desc: 'Tender beef stir fry.', time: 25, cat: catDinner.id, diff: diffMedium.id, ingredients: [{name: 'beef', q: '1 lb'}, {name: 'broccoli', q: '1 cup'}, {name: 'soy sauce', q: '2 tbsp'}] },

{ name: 'Shrimp Stir Fry', desc: 'Shrimp and vegetable stir fry.', time: 20, cat: catDinner.id, diff: diffMedium.id, ingredients: [{name: 'shrimp', q: '1 lb'}, {name: 'bell pepper', q: '1'}, {name: 'soy sauce', q: '2 tbsp'}] },

{ name: 'Chicken Teriyaki', desc: 'Sweet and savory teriyaki chicken.', time: 30, cat: catDinner.id, diff: diffMedium.id, ingredients: [{name: 'chicken', q: '1 lb'}, {name: 'teriyaki sauce', q: '1/2 cup'}, {name: 'rice', q: '2 cups'}] },

{ name: 'Orange Chicken', desc: 'Crispy chicken in orange sauce.', time: 35, cat: catDinner.id, diff: diffMedium.id, ingredients: [{name: 'chicken', q: '1 lb'}, {name: 'orange juice', q: '1 cup'}, {name: 'soy sauce', q: '2 tbsp'}, {name: 'cornstarch', q: '2 tbsp'}] },

{ name: 'Sweet and Sour Chicken', desc: 'Tangy sweet and sour chicken.', time: 30, cat: catDinner.id, diff: diffMedium.id, ingredients: [{name: 'chicken', q: '1 lb'}, {name: 'pineapple', q: '1 cup'}, {name: 'bell pepper', q: '1'}, {name: 'sweet sour sauce', q: '1/2 cup'}] },

{ name: 'Chicken Noodles', desc: 'Simple chicken noodles.', time: 25, cat: catLunch.id, diff: diffEasy.id, ingredients: [{name: 'noodles', q: '2 cups'}, {name: 'chicken', q: '1 cup'}, {name: 'soy sauce', q: '2 tbsp'}, {name: 'carrot', q: '1'}] },

{ name: 'Vegetable Noodles', desc: 'Mixed vegetable noodles.', time: 20, cat: catLunch.id, diff: diffEasy.id, ingredients: [{name: 'noodles', q: '2 cups'}, {name: 'carrot', q: '1'}, {name: 'cabbage', q: '1 cup'}, {name: 'soy sauce', q: '2 tbsp'}] },

{ name: 'Beef Noodles', desc: 'Savory beef noodles.', time: 30, cat: catLunch.id, diff: diffMedium.id, ingredients: [{name: 'noodles', q: '2 cups'}, {name: 'beef', q: '1 cup'}, {name: 'soy sauce', q: '2 tbsp'}, {name: 'onion', q: '1'}] },

{ name: 'Chicken Fajitas', desc: 'Sizzling chicken fajitas.', time: 25, cat: catDinner.id, diff: diffMedium.id, ingredients: [{name: 'chicken', q: '1 lb'}, {name: 'bell pepper', q: '2'}, {name: 'onion', q: '1'}, {name: 'tortilla', q: '4'}] },

{ name: 'Beef Fajitas', desc: 'Beef fajitas with peppers.', time: 30, cat: catDinner.id, diff: diffMedium.id, ingredients: [{name: 'beef', q: '1 lb'}, {name: 'bell pepper', q: '2'}, {name: 'onion', q: '1'}, {name: 'tortilla', q: '4'}] },

{ name: 'Chicken Enchiladas', desc: 'Baked chicken enchiladas.', time: 40, cat: catDinner.id, diff: diffMedium.id, ingredients: [{name: 'tortilla', q: '6'}, {name: 'chicken', q: '2 cups'}, {name: 'cheese', q: '1 cup'}, {name: 'enchilada sauce', q: '1 cup'}] },

{ name: 'Beef Enchiladas', desc: 'Classic beef enchiladas.', time: 45, cat: catDinner.id, diff: diffMedium.id, ingredients: [{name: 'tortilla', q: '6'}, {name: 'beef', q: '2 cups'}, {name: 'cheese', q: '1 cup'}, {name: 'enchilada sauce', q: '1 cup'}] },

{ name: 'Chicken Burrito', desc: 'Large chicken burrito.', time: 20, cat: catLunch.id, diff: diffEasy.id, ingredients: [{name: 'tortilla', q: '1'}, {name: 'chicken', q: '1 cup'}, {name: 'rice', q: '1/2 cup'}, {name: 'beans', q: '1/2 cup'}] },

{ name: 'Beef Burrito', desc: 'Loaded beef burrito.', time: 25, cat: catLunch.id, diff: diffMedium.id, ingredients: [{name: 'tortilla', q: '1'}, {name: 'beef', q: '1 cup'}, {name: 'rice', q: '1/2 cup'}, {name: 'beans', q: '1/2 cup'}] },

{ name: 'Vegetable Burrito', desc: 'Healthy vegetable burrito.', time: 20, cat: catLunch.id, diff: diffEasy.id, ingredients: [{name: 'tortilla', q: '1'}, {name: 'rice', q: '1/2 cup'}, {name: 'beans', q: '1/2 cup'}, {name: 'corn', q: '1/2 cup'}] },

{ name: 'Chicken Parmesan', desc: 'Breaded chicken with cheese.', time: 40, cat: catDinner.id, diff: diffMedium.id, ingredients: [{name: 'chicken', q: '2 breasts'}, {name: 'parmesan', q: '1 cup'}, {name: 'breadcrumbs', q: '1 cup'}, {name: 'tomato sauce', q: '1 cup'}] },

{ name: 'Eggplant Parmesan', desc: 'Vegetarian parmesan dish.', time: 45, cat: catDinner.id, diff: diffMedium.id, ingredients: [{name: 'eggplant', q: '2'}, {name: 'parmesan', q: '1 cup'}, {name: 'tomato sauce', q: '1 cup'}, {name: 'breadcrumbs', q: '1 cup'}] },

{ name: 'Chicken Caesar Wrap', desc: 'Caesar salad wrapped in tortilla.', time: 15, cat: catLunch.id, diff: diffEasy.id, ingredients: [{name: 'chicken', q: '1 cup'}, {name: 'tortilla', q: '1'}, {name: 'lettuce', q: '1 cup'}, {name: 'caesar dressing', q: '2 tbsp'}] },

{ name: 'Turkey Sandwich', desc: 'Classic turkey sandwich.', time: 10, cat: catLunch.id, diff: diffEasy.id, ingredients: [{name: 'bread', q: '2 slices'}, {name: 'turkey', q: '4 slices'}, {name: 'lettuce', q: '2 leaves'}, {name: 'mayo', q: '1 tbsp'}] },

{ name: 'Ham Sandwich', desc: 'Simple ham sandwich.', time: 10, cat: catLunch.id, diff: diffEasy.id, ingredients: [{name: 'bread', q: '2 slices'}, {name: 'ham', q: '4 slices'}, {name: 'cheese', q: '1 slice'}, {name: 'mustard', q: '1 tbsp'}] },

{ name: 'Chicken Panini', desc: 'Pressed chicken panini.', time: 15, cat: catLunch.id, diff: diffEasy.id, ingredients: [{name: 'bread', q: '2 slices'}, {name: 'chicken', q: '1/2 cup'}, {name: 'cheese', q: '2 slices'}, {name: 'tomato', q: '1'}] },

{ name: 'Vegetable Panini', desc: 'Grilled vegetable panini.', time: 15, cat: catLunch.id, diff: diffEasy.id, ingredients: [{name: 'bread', q: '2 slices'}, {name: 'zucchini', q: '1'}, {name: 'bell pepper', q: '1'}, {name: 'cheese', q: '2 slices'}] },

{ name: 'Chicken Pita Pocket', desc: 'Chicken stuffed pita pocket.', time: 15, cat: catLunch.id, diff: diffEasy.id, ingredients: [{name: 'pita bread', q: '1'}, {name: 'chicken', q: '1 cup'}, {name: 'lettuce', q: '1/2 cup'}, {name: 'tomato', q: '1'}] },

{ name: 'Beef Pita Pocket', desc: 'Beef-filled pita bread.', time: 20, cat: catLunch.id, diff: diffMedium.id, ingredients: [{name: 'pita bread', q: '1'}, {name: 'beef', q: '1 cup'}, {name: 'onion', q: '1/4 cup'}, {name: 'tomato', q: '1'}] },

{ name: 'Chicken Rice Bowl', desc: 'Chicken served over rice.', time: 25, cat: catDinner.id, diff: diffEasy.id, ingredients: [{name: 'rice', q: '2 cups'}, {name: 'chicken', q: '1 cup'}, {name: 'broccoli', q: '1 cup'}, {name: 'soy sauce', q: '2 tbsp'}] },

{ name: 'Beef Rice Bowl', desc: 'Beef and rice bowl.', time: 30, cat: catDinner.id, diff: diffMedium.id, ingredients: [{name: 'rice', q: '2 cups'}, {name: 'beef', q: '1 cup'}, {name: 'onion', q: '1'}, {name: 'soy sauce', q: '2 tbsp'}] },

{ name: 'Teriyaki Rice Bowl', desc: 'Teriyaki chicken over rice.', time: 30, cat: catDinner.id, diff: diffMedium.id, ingredients: [{name: 'rice', q: '2 cups'}, {name: 'chicken', q: '1 cup'}, {name: 'teriyaki sauce', q: '1/2 cup'}, {name: 'broccoli', q: '1 cup'}] },

{ name: 'Mediterranean Bowl', desc: 'Fresh Mediterranean grain bowl.', time: 20, cat: catLunch.id, diff: diffEasy.id, ingredients: [{name: 'rice', q: '1 cup'}, {name: 'chickpeas', q: '1 cup'}, {name: 'cucumber', q: '1'}, {name: 'feta cheese', q: '1/2 cup'}] },
{ name: 'Chocolate Chip Cookies', desc: 'Classic homemade chocolate chip cookies.', time: 25, cat: catDessert.id, diff: diffEasy.id, ingredients: [{name: 'flour', q: '2 cups'}, {name: 'chocolate chips', q: '1 cup'}, {name: 'butter', q: '1/2 cup'}, {name: 'sugar', q: '1 cup'}] },

{ name: 'Oatmeal Cookies', desc: 'Chewy oatmeal cookies.', time: 25, cat: catDessert.id, diff: diffEasy.id, ingredients: [{name: 'oats', q: '2 cups'}, {name: 'flour', q: '1 cup'}, {name: 'butter', q: '1/2 cup'}, {name: 'sugar', q: '1 cup'}] },

{ name: 'Blueberry Muffins', desc: 'Soft blueberry muffins.', time: 35, cat: catDessert.id, diff: diffMedium.id, ingredients: [{name: 'flour', q: '2 cups'}, {name: 'blueberries', q: '1 cup'}, {name: 'milk', q: '1 cup'}, {name: 'egg', q: '2'}] },

{ name: 'Chocolate Muffins', desc: 'Rich chocolate muffins.', time: 35, cat: catDessert.id, diff: diffMedium.id, ingredients: [{name: 'flour', q: '2 cups'}, {name: 'cocoa powder', q: '1/2 cup'}, {name: 'milk', q: '1 cup'}, {name: 'egg', q: '2'}] },

{ name: 'Cheesecake', desc: 'Creamy baked cheesecake.', time: 60, cat: catDessert.id, diff: diffHard.id, ingredients: [{name: 'cream cheese', q: '2 cups'}, {name: 'sugar', q: '1 cup'}, {name: 'egg', q: '3'}, {name: 'graham crackers', q: '1 cup'}] },

{ name: 'Strawberry Cheesecake', desc: 'Cheesecake topped with strawberries.', time: 65, cat: catDessert.id, diff: diffHard.id, ingredients: [{name: 'cream cheese', q: '2 cups'}, {name: 'strawberries', q: '1 cup'}, {name: 'sugar', q: '1 cup'}, {name: 'egg', q: '3'}] },

{ name: 'Vanilla Ice Cream', desc: 'Homemade vanilla ice cream.', time: 30, cat: catDessert.id, diff: diffMedium.id, ingredients: [{name: 'milk', q: '2 cups'}, {name: 'cream', q: '1 cup'}, {name: 'sugar', q: '3/4 cup'}, {name: 'vanilla', q: '1 tsp'}] },

{ name: 'Chocolate Ice Cream', desc: 'Creamy chocolate ice cream.', time: 35, cat: catDessert.id, diff: diffMedium.id, ingredients: [{name: 'milk', q: '2 cups'}, {name: 'cream', q: '1 cup'}, {name: 'cocoa powder', q: '1/2 cup'}, {name: 'sugar', q: '3/4 cup'}] },

{ name: 'Banana Split', desc: 'Classic banana split dessert.', time: 10, cat: catDessert.id, diff: diffEasy.id, ingredients: [{name: 'banana', q: '1'}, {name: 'ice cream', q: '3 scoops'}, {name: 'chocolate syrup', q: '2 tbsp'}, {name: 'nuts', q: '2 tbsp'}] },

{ name: 'Fruit Parfait', desc: 'Layered fruit and yogurt parfait.', time: 10, cat: catDessert.id, diff: diffEasy.id, ingredients: [{name: 'yogurt', q: '1 cup'}, {name: 'berries', q: '1 cup'}, {name: 'granola', q: '1/2 cup'}] },

{ name: 'Rice Pudding', desc: 'Creamy rice pudding dessert.', time: 40, cat: catDessert.id, diff: diffEasy.id, ingredients: [{name: 'rice', q: '1 cup'}, {name: 'milk', q: '2 cups'}, {name: 'sugar', q: '1/2 cup'}, {name: 'cinnamon', q: '1 tsp'}] },

{ name: 'Bread Pudding', desc: 'Warm bread pudding.', time: 45, cat: catDessert.id, diff: diffMedium.id, ingredients: [{name: 'bread', q: '4 cups'}, {name: 'milk', q: '2 cups'}, {name: 'egg', q: '3'}, {name: 'sugar', q: '1/2 cup'}] },

{ name: 'Carrot Cake', desc: 'Moist homemade carrot cake.', time: 55, cat: catDessert.id, diff: diffMedium.id, ingredients: [{name: 'carrot', q: '2 cups'}, {name: 'flour', q: '2 cups'}, {name: 'egg', q: '3'}, {name: 'sugar', q: '1 cup'}] },

{ name: 'Red Velvet Cake', desc: 'Classic red velvet cake.', time: 60, cat: catDessert.id, diff: diffHard.id, ingredients: [{name: 'flour', q: '2 cups'}, {name: 'cocoa powder', q: '2 tbsp'}, {name: 'cream cheese', q: '1 cup'}, {name: 'egg', q: '3'}] },

{ name: 'Chocolate Brownie Sundae', desc: 'Brownie topped with ice cream.', time: 20, cat: catDessert.id, diff: diffEasy.id, ingredients: [{name: 'brownie', q: '1 piece'}, {name: 'ice cream', q: '2 scoops'}, {name: 'chocolate syrup', q: '2 tbsp'}] },

{ name: 'Mango Smoothie', desc: 'Refreshing mango smoothie.', time: 5, cat: catSnack.id, diff: diffEasy.id, ingredients: [{name: 'mango', q: '2'}, {name: 'milk', q: '1 cup'}, {name: 'yogurt', q: '1/2 cup'}] },

{ name: 'Berry Smoothie', desc: 'Mixed berry smoothie.', time: 5, cat: catSnack.id, diff: diffEasy.id, ingredients: [{name: 'berries', q: '1 cup'}, {name: 'milk', q: '1 cup'}, {name: 'honey', q: '1 tbsp'}] },

{ name: 'Green Smoothie', desc: 'Healthy green smoothie.', time: 5, cat: catBreakfast.id, diff: diffEasy.id, ingredients: [{name: 'spinach', q: '1 cup'}, {name: 'banana', q: '1'}, {name: 'milk', q: '1 cup'}] },

{ name: 'Protein Shake', desc: 'High-protein workout shake.', time: 5, cat: catBreakfast.id, diff: diffEasy.id, ingredients: [{name: 'protein powder', q: '1 scoop'}, {name: 'milk', q: '1 cup'}, {name: 'banana', q: '1'}] },

{ name: 'Granola Bowl', desc: 'Crunchy granola breakfast bowl.', time: 5, cat: catBreakfast.id, diff: diffEasy.id, ingredients: [{name: 'granola', q: '1 cup'}, {name: 'yogurt', q: '1 cup'}, {name: 'berries', q: '1/2 cup'}] },

{ name: 'Chia Pudding', desc: 'Healthy chia seed pudding.', time: 10, cat: catBreakfast.id, diff: diffEasy.id, ingredients: [{name: 'chia seeds', q: '1/4 cup'}, {name: 'milk', q: '1 cup'}, {name: 'honey', q: '1 tbsp'}] },

{ name: 'Breakfast Burrito', desc: 'Egg-filled breakfast burrito.', time: 15, cat: catBreakfast.id, diff: diffEasy.id, ingredients: [{name: 'tortilla', q: '1'}, {name: 'egg', q: '2'}, {name: 'cheese', q: '1/4 cup'}, {name: 'sausage', q: '1/4 cup'}] },

{ name: 'Egg Muffins', desc: 'Baked egg breakfast muffins.', time: 20, cat: catBreakfast.id, diff: diffEasy.id, ingredients: [{name: 'egg', q: '4'}, {name: 'cheese', q: '1/2 cup'}, {name: 'bell pepper', q: '1/2 cup'}] },

{ name: 'Hash Browns', desc: 'Crispy potato hash browns.', time: 20, cat: catBreakfast.id, diff: diffEasy.id, ingredients: [{name: 'potato', q: '2'}, {name: 'butter', q: '1 tbsp'}, {name: 'salt', q: '1 tsp'}] },

{ name: 'Breakfast Sandwich', desc: 'Egg and cheese breakfast sandwich.', time: 15, cat: catBreakfast.id, diff: diffEasy.id, ingredients: [{name: 'bread', q: '2 slices'}, {name: 'egg', q: '1'}, {name: 'cheese', q: '1 slice'}, {name: 'butter', q: '1 tbsp'}] },
{ name: 'Chocolate Chip Cookies', desc: 'Classic homemade chocolate chip cookies.', time: 25, cat: catDessert.id, diff: diffEasy.id, ingredients: [{name: 'flour', q: '2 cups'}, {name: 'chocolate chips', q: '1 cup'}, {name: 'butter', q: '1/2 cup'}, {name: 'sugar', q: '1 cup'}] },

{ name: 'Oatmeal Cookies', desc: 'Chewy oatmeal cookies.', time: 25, cat: catDessert.id, diff: diffEasy.id, ingredients: [{name: 'oats', q: '2 cups'}, {name: 'flour', q: '1 cup'}, {name: 'butter', q: '1/2 cup'}, {name: 'sugar', q: '1 cup'}] },

{ name: 'Blueberry Muffins', desc: 'Soft blueberry muffins.', time: 35, cat: catDessert.id, diff: diffMedium.id, ingredients: [{name: 'flour', q: '2 cups'}, {name: 'blueberries', q: '1 cup'}, {name: 'milk', q: '1 cup'}, {name: 'egg', q: '2'}] },

{ name: 'Chocolate Muffins', desc: 'Rich chocolate muffins.', time: 35, cat: catDessert.id, diff: diffMedium.id, ingredients: [{name: 'flour', q: '2 cups'}, {name: 'cocoa powder', q: '1/2 cup'}, {name: 'milk', q: '1 cup'}, {name: 'egg', q: '2'}] },

{ name: 'Cheesecake', desc: 'Creamy baked cheesecake.', time: 60, cat: catDessert.id, diff: diffHard.id, ingredients: [{name: 'cream cheese', q: '2 cups'}, {name: 'sugar', q: '1 cup'}, {name: 'egg', q: '3'}, {name: 'graham crackers', q: '1 cup'}] },

{ name: 'Strawberry Cheesecake', desc: 'Cheesecake topped with strawberries.', time: 65, cat: catDessert.id, diff: diffHard.id, ingredients: [{name: 'cream cheese', q: '2 cups'}, {name: 'strawberries', q: '1 cup'}, {name: 'sugar', q: '1 cup'}, {name: 'egg', q: '3'}] },

{ name: 'Vanilla Ice Cream', desc: 'Homemade vanilla ice cream.', time: 30, cat: catDessert.id, diff: diffMedium.id, ingredients: [{name: 'milk', q: '2 cups'}, {name: 'cream', q: '1 cup'}, {name: 'sugar', q: '3/4 cup'}, {name: 'vanilla', q: '1 tsp'}] },

{ name: 'Chocolate Ice Cream', desc: 'Creamy chocolate ice cream.', time: 35, cat: catDessert.id, diff: diffMedium.id, ingredients: [{name: 'milk', q: '2 cups'}, {name: 'cream', q: '1 cup'}, {name: 'cocoa powder', q: '1/2 cup'}, {name: 'sugar', q: '3/4 cup'}] },

{ name: 'Banana Split', desc: 'Classic banana split dessert.', time: 10, cat: catDessert.id, diff: diffEasy.id, ingredients: [{name: 'banana', q: '1'}, {name: 'ice cream', q: '3 scoops'}, {name: 'chocolate syrup', q: '2 tbsp'}, {name: 'nuts', q: '2 tbsp'}] },

{ name: 'Fruit Parfait', desc: 'Layered fruit and yogurt parfait.', time: 10, cat: catDessert.id, diff: diffEasy.id, ingredients: [{name: 'yogurt', q: '1 cup'}, {name: 'berries', q: '1 cup'}, {name: 'granola', q: '1/2 cup'}] },

{ name: 'Rice Pudding', desc: 'Creamy rice pudding dessert.', time: 40, cat: catDessert.id, diff: diffEasy.id, ingredients: [{name: 'rice', q: '1 cup'}, {name: 'milk', q: '2 cups'}, {name: 'sugar', q: '1/2 cup'}, {name: 'cinnamon', q: '1 tsp'}] },

{ name: 'Bread Pudding', desc: 'Warm bread pudding.', time: 45, cat: catDessert.id, diff: diffMedium.id, ingredients: [{name: 'bread', q: '4 cups'}, {name: 'milk', q: '2 cups'}, {name: 'egg', q: '3'}, {name: 'sugar', q: '1/2 cup'}] },

{ name: 'Carrot Cake', desc: 'Moist homemade carrot cake.', time: 55, cat: catDessert.id, diff: diffMedium.id, ingredients: [{name: 'carrot', q: '2 cups'}, {name: 'flour', q: '2 cups'}, {name: 'egg', q: '3'}, {name: 'sugar', q: '1 cup'}] },

{ name: 'Red Velvet Cake', desc: 'Classic red velvet cake.', time: 60, cat: catDessert.id, diff: diffHard.id, ingredients: [{name: 'flour', q: '2 cups'}, {name: 'cocoa powder', q: '2 tbsp'}, {name: 'cream cheese', q: '1 cup'}, {name: 'egg', q: '3'}] },

{ name: 'Chocolate Brownie Sundae', desc: 'Brownie topped with ice cream.', time: 20, cat: catDessert.id, diff: diffEasy.id, ingredients: [{name: 'brownie', q: '1 piece'}, {name: 'ice cream', q: '2 scoops'}, {name: 'chocolate syrup', q: '2 tbsp'}] },

{ name: 'Mango Smoothie', desc: 'Refreshing mango smoothie.', time: 5, cat: catSnack.id, diff: diffEasy.id, ingredients: [{name: 'mango', q: '2'}, {name: 'milk', q: '1 cup'}, {name: 'yogurt', q: '1/2 cup'}] },

{ name: 'Berry Smoothie', desc: 'Mixed berry smoothie.', time: 5, cat: catSnack.id, diff: diffEasy.id, ingredients: [{name: 'berries', q: '1 cup'}, {name: 'milk', q: '1 cup'}, {name: 'honey', q: '1 tbsp'}] },

{ name: 'Green Smoothie', desc: 'Healthy green smoothie.', time: 5, cat: catBreakfast.id, diff: diffEasy.id, ingredients: [{name: 'spinach', q: '1 cup'}, {name: 'banana', q: '1'}, {name: 'milk', q: '1 cup'}] },

{ name: 'Protein Shake', desc: 'High-protein workout shake.', time: 5, cat: catBreakfast.id, diff: diffEasy.id, ingredients: [{name: 'protein powder', q: '1 scoop'}, {name: 'milk', q: '1 cup'}, {name: 'banana', q: '1'}] },

{ name: 'Granola Bowl', desc: 'Crunchy granola breakfast bowl.', time: 5, cat: catBreakfast.id, diff: diffEasy.id, ingredients: [{name: 'granola', q: '1 cup'}, {name: 'yogurt', q: '1 cup'}, {name: 'berries', q: '1/2 cup'}] },

{ name: 'Chia Pudding', desc: 'Healthy chia seed pudding.', time: 10, cat: catBreakfast.id, diff: diffEasy.id, ingredients: [{name: 'chia seeds', q: '1/4 cup'}, {name: 'milk', q: '1 cup'}, {name: 'honey', q: '1 tbsp'}] },

{ name: 'Breakfast Burrito', desc: 'Egg-filled breakfast burrito.', time: 15, cat: catBreakfast.id, diff: diffEasy.id, ingredients: [{name: 'tortilla', q: '1'}, {name: 'egg', q: '2'}, {name: 'cheese', q: '1/4 cup'}, {name: 'sausage', q: '1/4 cup'}] },

{ name: 'Egg Muffins', desc: 'Baked egg breakfast muffins.', time: 20, cat: catBreakfast.id, diff: diffEasy.id, ingredients: [{name: 'egg', q: '4'}, {name: 'cheese', q: '1/2 cup'}, {name: 'bell pepper', q: '1/2 cup'}] },

{ name: 'Hash Browns', desc: 'Crispy potato hash browns.', time: 20, cat: catBreakfast.id, diff: diffEasy.id, ingredients: [{name: 'potato', q: '2'}, {name: 'butter', q: '1 tbsp'}, {name: 'salt', q: '1 tsp'}] },

{ name: 'Breakfast Sandwich', desc: 'Egg and cheese breakfast sandwich.', time: 15, cat: catBreakfast.id, diff: diffEasy.id, ingredients: [{name: 'bread', q: '2 slices'}, {name: 'egg', q: '1'}, {name: 'cheese', q: '1 slice'}, {name: 'butter', q: '1 tbsp'}] },
 // Add these NEW recipes to your recipesData array (20 unique items)
{ name: 'Shrimp Scampi', desc: 'Succulent shrimp in a garlic lemon butter sauce over pasta.', time: 20, cat: catDinner.id, diff: diffMedium.id, ingredients: [{name: 'shrimp', q: '1 lb'}, {name: 'pasta', q: '8 oz'}, {name: 'garlic', q: '4 cloves'}, {name: 'butter', q: '4 tbsp'}, {name: 'lemon', q: '1'}] },
{ name: 'Lentil Soup', desc: 'Hearty and healthy lentil soup.', time: 45, cat: catLunch.id, diff: diffEasy.id, ingredients: [{name: 'lentils', q: '1 cup'}, {name: 'carrot', q: '2'}, {name: 'celery', q: '2 stalks'}, {name: 'onion', q: '1'}, {name: 'vegetable broth', q: '4 cups'}] },
{ name: 'Zucchini Bread', desc: 'Sweet and moist bread perfect for breakfast or dessert.', time: 55, cat: catDessert.id, diff: diffMedium.id, ingredients: [{name: 'zucchini', q: '2 cups shredded'}, {name: 'flour', q: '2 cups'}, {name: 'sugar', q: '1 cup'}, {name: 'egg', q: '2'}, {name: 'cinnamon', q: '1 tsp'}] },
{ name: 'Chicken Marsala', desc: 'Chicken breasts in a rich mushroom and Marsala wine sauce.', time: 35, cat: catDinner.id, diff: diffHard.id, ingredients: [{name: 'chicken', q: '2 breasts'}, {name: 'marsala wine', q: '1 cup'}, {name: 'mushroom', q: '8 oz'}, {name: 'flour', q: '1/2 cup'}, {name: 'butter', q: '3 tbsp'}] },
{ name: 'Caprese Salad', desc: 'Fresh Italian salad with tomatoes, mozzarella, and basil.', time: 10, cat: catLunch.id, diff: diffEasy.id, ingredients: [{name: 'tomato', q: '2 large'}, {name: 'mozzarella', q: '8 oz'}, {name: 'basil', q: '1/2 cup'}, {name: 'olive oil', q: '2 tbsp'}, {name: 'balsamic glaze', q: '1 tbsp'}] },
{ name: 'Butternut Squash Soup', desc: 'Creamy and velvety roasted butternut squash soup.', time: 50, cat: catLunch.id, diff: diffMedium.id, ingredients: [{name: 'butternut squash', q: '2 lbs'}, {name: 'onion', q: '1'}, {name: 'carrot', q: '1'}, {name: 'vegetable broth', q: '3 cups'}, {name: 'cream', q: '1/2 cup'}] },
{ name: 'Pesto Pasta', desc: 'Simple pasta tossed in homemade basil pesto.', time: 15, cat: catDinner.id, diff: diffEasy.id, ingredients: [{name: 'pasta', q: '8 oz'}, {name: 'basil', q: '2 cups'}, {name: 'pine nuts', q: '1/4 cup'}, {name: 'parmesan', q: '1/2 cup'}, {name: 'olive oil', q: '1/2 cup'}] },
{ name: 'Eggplant Rollatini', desc: 'Rolled eggplant slices filled with ricotta and baked with marinara.', time: 50, cat: catDinner.id, diff: diffHard.id, ingredients: [{name: 'eggplant', q: '2 large'}, {name: 'ricotta cheese', q: '2 cups'}, {name: 'mozzarella', q: '1 cup'}, {name: 'marinara sauce', q: '2 cups'}, {name: 'egg', q: '1'}] },
{ name: 'Guacamole', desc: 'Fresh and creamy avocado dip.', time: 10, cat: catSnack.id, diff: diffEasy.id, ingredients: [{name: 'avocado', q: '3'}, {name: 'lime', q: '1'}, {name: 'onion', q: '1/4 cup'}, {name: 'cilantro', q: '2 tbsp'}, {name: 'tomato', q: '1'}] },
{ name: 'Clam Chowder', desc: 'Creamy New England style clam chowder.', time: 40, cat: catLunch.id, diff: diffMedium.id, ingredients: [{name: 'clams', q: '2 cans minced'}, {name: 'potato', q: '3'}, {name: 'onion', q: '1'}, {name: 'celery', q: '2 stalks'}, {name: 'cream', q: '1 cup'}] },
{ name: 'Pad Thai', desc: 'Famous Thai stir-fried noodle dish.', time: 30, cat: catDinner.id, diff: diffHard.id, ingredients: [{name: 'rice noodles', q: '8 oz'}, {name: 'shrimp', q: '1/2 lb'}, {name: 'tofu', q: '1/2 block'}, {name: 'egg', q: '2'}, {name: 'bean sprouts', q: '1 cup'}, {name: 'peanuts', q: '1/4 cup'}] },
{ name: 'Stuffed Mushrooms', desc: 'Mushroom caps stuffed with garlic, cheese, and breadcrumbs.', time: 25, cat: catSnack.id, diff: diffEasy.id, ingredients: [{name: 'mushroom', q: '16 oz'}, {name: 'cream cheese', q: '4 oz'}, {name: 'parmesan', q: '1/4 cup'}, {name: 'garlic', q: '2 cloves'}, {name: 'breadcrumbs', q: '1/4 cup'}] },
{ name: 'Risotto alla Milanese', desc: 'Creamy saffron-infused risotto.', time: 35, cat: catDinner.id, diff: diffHard.id, ingredients: [{name: 'arborio rice', q: '1.5 cups'}, {name: 'saffron', q: '1 pinch'}, {name: 'onion', q: '1/2'}, {name: 'white wine', q: '1/2 cup'}, {name: 'parmesan', q: '1/2 cup'}, {name: 'broth', q: '4 cups'}] },
{ name: 'Pico de Gallo', desc: 'Fresh Mexican salsa.', time: 10, cat: catSnack.id, diff: diffEasy.id, ingredients: [{name: 'tomato', q: '4'}, {name: 'onion', q: '1/2'}, {name: 'jalapeno', q: '1'}, {name: 'cilantro', q: '1/4 cup'}, {name: 'lime', q: '1'}] },
{ name: 'Cioppino', desc: 'Italian-American seafood stew.', time: 45, cat: catDinner.id, diff: diffHard.id, ingredients: [{name: 'shrimp', q: '1/2 lb'}, {name: 'mussels', q: '1/2 lb'}, {name: 'clams', q: '1/2 lb'}, {name: 'fish', q: '1/2 lb'}, {name: 'tomato sauce', q: '2 cups'}, {name: 'white wine', q: '1 cup'}] },
{ name: 'Bruschetta', desc: 'Toasted bread topped with fresh tomatoes and basil.', time: 15, cat: catSnack.id, diff: diffEasy.id, ingredients: [{name: 'baguette', q: '1'}, {name: 'tomato', q: '4'}, {name: 'basil', q: '1/2 cup'}, {name: 'garlic', q: '2 cloves'}, {name: 'olive oil', q: '1/4 cup'}] },
{ name: 'Beef Wellington', desc: 'Beef tenderloin wrapped in puff pastry with duxelles.', time: 90, cat: catDinner.id, diff: diffHard.id, ingredients: [{name: 'beef tenderloin', q: '2 lbs'}, {name: 'puff pastry', q: '1 sheet'}, {name: 'mushroom', q: '1 lb'}, {name: 'prosciutto', q: '6 slices'}, {name: 'mustard', q: '2 tbsp'}, {name: 'egg', q: '1'}] },
{ name: 'Quiche Lorraine', desc: 'Classic French egg and bacon tart.', time: 45, cat: catBreakfast.id, diff: diffMedium.id, ingredients: [{name: 'pie crust', q: '1'}, {name: 'egg', q: '4'}, {name: 'bacon', q: '6 slices'}, {name: 'cream', q: '1 cup'}, {name: 'gruyere cheese', q: '1 cup'}] },
{ name: 'Creme Brulee', desc: 'Rich custard with a caramelized sugar topping.', time: 45, cat: catDessert.id, diff: diffHard.id, ingredients: [{name: 'cream', q: '2 cups'}, {name: 'egg yolk', q: '5'}, {name: 'sugar', q: '1/2 cup'}, {name: 'vanilla', q: '1 tsp'}, {name: 'brown sugar', q: '2 tbsp'}] },
{ name: 'Tiramisu', desc: 'Classic Italian coffee-flavored dessert.', time: 30, cat: catDessert.id, diff: diffHard.id, ingredients: [{name: 'mascarpone cheese', q: '8 oz'}, {name: 'ladyfingers', q: '24'}, {name: 'espresso', q: '1 cup'}, {name: 'egg yolk', q: '3'}, {name: 'sugar', q: '1/2 cup'}, {name: 'cocoa powder', q: '2 tbsp'}] },
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
