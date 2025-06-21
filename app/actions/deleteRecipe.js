'use server';

import { db } from '../../configs/db'; // adjust as needed
import { Recipes } from '../../configs/schema'; // your drizzle schema
import { eq } from 'drizzle-orm';

export async function deleteRecipeById(id) {
  await db.delete(Recipes).where(eq(Recipes.id, id));
}
