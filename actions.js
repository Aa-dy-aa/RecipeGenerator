'use server'; // This directive makes all exports in this file server actions

import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { and, eq } from 'drizzle-orm';
import uuid4 from 'uuid4';
import { RecipeList } from './configs/schema';
console.log('DATABASE_URL in actions.js (for direct init):', process.env.DATABASE_URL);
const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql);
export async function saveRecipeToDatabase(
  recipeLayout,
  cuisineType,
  cuisineCategory,
  duration,
  userEmail,
  userName,
  userProfileImage
) {

  const finalUserEmail = userEmail || null;
  const finalUserName = userName || null;
  const finalUserProfileImage = userProfileImage || null;

  const id = uuid4();
  const ingredientsToSave = Array.isArray(recipeLayout.ingredients) ? recipeLayout.ingredients : [];

  if (!db || typeof db.insert !== 'function') {
    console.error('Database connection (db) is not properly initialized or insert method is missing.');
    return { success: false, message: 'Database connection error.' };
  }

  await db.insert(RecipeList).values({
    recipeId: id,
    name: recipeLayout.recipeName,
    cuisine: cuisineType,
    category: cuisineCategory,
    ingredients: ingredientsToSave,
    duration: duration,
    recipeOutput: recipeLayout,
    createdBy: finalUserEmail,
    userName: finalUserName,
    userProfileImage: finalUserProfileImage
  });

  console.log("Recipe saved successfully with ID:", id);

  return {
    success: true,
    message: "Recipe saved successfully!",
    data: { recipeId: id }
  };
}
export async function getRecipeByIdAndUser(recipeId, userEmail) {
  console.log('Attempting to fetch recipe for:', { recipeId, userEmail });

  if (!recipeId || !userEmail) {
    console.error('getRecipeByIdAndUser: Missing required parameters (recipeId or userEmail).');
    return null;
  }

  const result = await db.select()
    .from(RecipeList)
    .where(and(
      eq(RecipeList.recipeId, recipeId),
      eq(RecipeList.createdBy, userEmail)
    ));

  if (result.length > 0) {
    console.log('Recipe fetched successfully from DB for ID:', recipeId);
    return result[0];
  } else {
    console.log('No recipe found for ID:', recipeId, 'and user:', userEmail);
    return null;
  }
}