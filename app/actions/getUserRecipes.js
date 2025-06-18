'use server';

import { db } from '../../configs/db';
import { RecipeList } from '../../configs/schema';
import { eq } from 'drizzle-orm';

export const getUserRecipes = async (userEmail) => {
  if (!userEmail) return [];
  const result = await db
    .select()
    .from(RecipeList)
    .where(eq(RecipeList.createdBy, userEmail));
  return result;
};
