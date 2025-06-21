'use server';
import { db } from '../../configs/db'; 
import { Recipes } from '../../configs/schema'; 
import { eq } from 'drizzle-orm';

export async function deleteRecipeById(id) {
  await db.delete(Recipes).where(eq(Recipes.id, id));
}
