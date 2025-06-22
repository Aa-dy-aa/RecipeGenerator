'use server';

import { db } from '../../configs/db';
import { RecipeList } from '../../configs/schema';
import { eq } from 'drizzle-orm';

export const getRecipeById = async (recipeId) => {
  const result = await db
    .select()
    .from(RecipeList)
    .where(eq(RecipeList.recipeId, recipeId));

  return result[0];
};
