'use server';

import { db } from '../../configs/db';
import { RecipeList, Recipes } from '../../configs/schema';
import { eq } from 'drizzle-orm';

// 🔹 Original function (from recipe_list)
export const getUserRecipes = async (userEmail) => {
  if (!userEmail) return [];
  const result = await db
    .select()
    .from(RecipeList)
    .where(eq(RecipeList.createdBy, userEmail));
  return result;
};

// 🔹 NEW: Function to get from 'recipes' table
export const getUserSavedRecipes = async () => {
  const result = await db.select().from(Recipes);
  return result;
};
